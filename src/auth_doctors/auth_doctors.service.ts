import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { DoctorsService } from "../doctors/doctors.service";
import { Doctor } from "../doctors/models/doctor.model";
import { DoctorSignInDto } from "./dto/doctor-sign-in.dto";
@Injectable()
export class AuthDoctorsService {
	constructor(
		private readonly doctorsService: DoctorsService,
		private readonly jwtService: JwtService
	) {}
	async generateTokens(doctor: Doctor) {
		const payload = {
			id: doctor.id,
			isActive: doctor.is_active,
			roles: doctor.isHeadDoctor ? ["doctor", "head_doctor"] : ["doctor"],
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
	async signIn(doctorSignInDto: DoctorSignInDto, res: Response) {
		const doctor = await this.doctorsService.findByEmail(doctorSignInDto.email);
		if (!doctor) {
			throw new BadRequestException("Invalid email or password");
		}
		if (!doctor.is_active) {
			throw new UnauthorizedException("Please, activate your account!");
		}
		const validPassword = await bcrypt.compare(
			doctorSignInDto.password,
			doctor.password
		);
		if (!validPassword) {
			throw new BadRequestException("Invalid email or password");
		}
		const { accessToken, refreshToken } = await this.generateTokens(doctor);
		res.cookie("refreshToken", refreshToken, {
			maxAge: Number(process.env.COOKIE_TIME),
			httpOnly: true,
		});
		doctor.refresh_token = await bcrypt.hash(refreshToken, 7);
		await doctor.save();
		return {
			message: "Welcome!!!",
			accessToken,
		};
	}
	async updateRefreshToken(
		doctorId: number,
		refresh_token: string,
		res: Response
	) {
		const decodedRefreshToken = await this.jwtService.decode(refresh_token);
		if (doctorId !== decodedRefreshToken["id"]) {
			throw new ForbiddenException("Not Allowed");
		}
		const docotor = await this.doctorsService.findOne(doctorId);
		if (!docotor || !docotor.refresh_token) {
			throw new NotFoundException("Doctor not found");
		}
		const tokenMatch = await bcrypt.compare(refresh_token, docotor.refresh_token);
		if (!tokenMatch) {
			throw new ForbiddenException("Forbidden!");
		}
		const { accessToken, refreshToken } = await this.generateTokens(docotor);
		const hashshedRefreshToken = await bcrypt.hash(refreshToken, 7);
		await this.doctorsService.updateRefreshToken(doctorId, hashshedRefreshToken);
		res.cookie("refreshToken", refreshToken, {
			maxAge: Number(process.env.COOKIE_TIME),
			httpOnly: true,
		});
		return {
			message: "Doctor Refresh Token updated",
			id: doctorId,
			accessToken,
		};
	}
	async signOut(refreshToken: string, res: Response) {
		const doctorData = await this.jwtService.verify(refreshToken, {
			secret: process.env.REFRESH_TOKEN_KEY,
		});
		if (!doctorData) {
			throw new ForbiddenException("Doctor not verified!");
		}
		this.doctorsService.updateRefreshToken(doctorData.id, null!);
		res.clearCookie("refreshToken");
		return {
			message: "Doctor logged out",
		};
	}
}
