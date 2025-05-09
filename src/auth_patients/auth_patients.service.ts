import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { CreatePatientDto } from "../patients/dto/create-patient.dto";
import { Patient } from "../patients/models/patient.model";
import { PatientsService } from "../patients/patients.service";
import { PatientSignInDto } from "./dto/patient-sign-in.dto";
@Injectable()
export class AuthPatientsService {
	constructor(
		private readonly patientsService: PatientsService,
		private readonly jwtService: JwtService
	) {}
	async generateTokens(patient: Patient) {
		const payload = {
			id: patient.id,
			isActive: patient.is_active,
			roles: ["patient"],
		};
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: process.env.ACCESS_TOKEN_KEY,
				expiresIn: process.env.ACCESS_TOKEN_TIME,
			}),
			this.jwtService.signAsync(payload, {
				secret: process.env.REFRESH_TOKEN_KEY,
				expiresIn: process.env.REFRESH_TOKEN_TIME,
			}),
		]);
		return {
			accessToken,
			refreshToken,
		};
	}
	async signUp(createPatientDto: CreatePatientDto) {
		const condidate = await this.patientsService.findByEmail(
			createPatientDto.email
		);
		if (condidate) {
			throw new ConflictException(`${createPatientDto.email} already exists`);
		}
		const newPatient = await this.patientsService.create(createPatientDto);
		return {
			message: "Patient created",
			newPatientId: newPatient.newPatient.id,
		};
	}
	async signIn(patientSignInDto: PatientSignInDto, res: Response) {
		const patient = await this.patientsService.findByEmail(
			patientSignInDto.email
		);
		if (!patient) {
			throw new BadRequestException("Invalid email or password");
		}
		if (!patient.is_active) {
			throw new UnauthorizedException("Please, activate your account!");
		}
		const validPassword = await bcrypt.compare(
			patientSignInDto.password,
			patient.password
		);
		if (!validPassword) {
			throw new BadRequestException("Invalid email or password");
		}
		const { accessToken, refreshToken } = await this.generateTokens(patient);
		res.cookie("refreshToken", refreshToken, {
			maxAge: Number(process.env.COOKIE_TIME),
			httpOnly: true,
		});
		patient.refresh_token = await bcrypt.hash(refreshToken, 7);
		await patient.save();
		return {
			message: "Welcome!!!",
			accessToken,
		};
	}
	async updateRefreshToken(
		patientId: number,
		refresh_token: string,
		res: Response
	) {
		const decodedRefreshToken = await this.jwtService.decode(refresh_token);
		if (patientId !== decodedRefreshToken["id"]) {
			throw new ForbiddenException("Not Allowed");
		}
		const patient = await this.patientsService.findOne(patientId);
		if (!patient || !patient.refresh_token) {
			throw new NotFoundException("Patient not found");
		}
		const tokenMatch = await bcrypt.compare(
			refresh_token,
			patient.refresh_token
		);
		if (!tokenMatch) {
			throw new ForbiddenException("Forbidden!");
		}
		const { accessToken, refreshToken } = await this.generateTokens(patient);
		const hashshedRefreshToken = await bcrypt.hash(refreshToken, 7);
		await this.patientsService.updateRefreshToken(
			patientId,
			hashshedRefreshToken
		);
		res.cookie("refreshToken", refreshToken, {
			maxAge: Number(process.env.COOKIE_TIME),
			httpOnly: true,
		});
		return {
			message: "Patient Refresh Token updated",
			id: patientId,
			accessToken,
		};
	}
	async signOut(refreshToken: string, res: Response) {
		const patientData = await this.jwtService.verify(refreshToken, {
			secret: process.env.REFRESH_TOKEN_KEY,
		});
		if (!patientData) {
			throw new ForbiddenException("User not verified!");
		}
		this.patientsService.updateRefreshToken(patientData.id, null!);
		res.clearCookie("refreshToken");
		return {
			message: "User logged out",
		};
	}
}
