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
import { Staff } from "../staffs/models/staff.model";
import { StaffsService } from "../staffs/staffs.service";
import { StaffSignInDto } from "./dto/staff-sign-in.dto";
@Injectable()
export class AuthStaffsService {
	constructor(
		private readonly staffsService: StaffsService,
		private readonly jwtService: JwtService
	) {}
	async generateTokens(staff: Staff) {
		const payload = {
			id: staff.id,
			isActive: staff.is_active,
			roles: staff.isManager ? ["staff", "manager"] : ["staff"],
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
	async signIn(staffSignInDto: StaffSignInDto, res: Response) {
		const staff = await this.staffsService.findByEmail(staffSignInDto.email);
		if (!staff) {
			throw new BadRequestException("Invalid email or password");
		}
		if (!staff.is_active) {
			throw new UnauthorizedException("Please, activate your account!");
		}
		const validPassword = await bcrypt.compare(
			staffSignInDto.password,
			staff.password
		);
		if (!validPassword) {
			throw new BadRequestException("Invalid email or password");
		}
		const { accessToken, refreshToken } = await this.generateTokens(staff);
		res.cookie("refreshToken", refreshToken, {
			maxAge: Number(process.env.COOKIE_TIME),
			httpOnly: true,
		});
		staff.refresh_token = await bcrypt.hash(refreshToken, 7);
		await staff.save();
		return {
			message: "Welcome!!!",
			accessToken,
		};
	}
	async updateRefreshToken(
		staffId: number,
		refresh_token: string,
		res: Response
	) {
		const decodedRefreshToken = await this.jwtService.decode(refresh_token);
		if (staffId !== decodedRefreshToken["id"]) {
			throw new ForbiddenException("Not Allowed");
		}
		const staff = await this.staffsService.findOne(staffId);
		if (!staff || !staff.refresh_token) {
			throw new NotFoundException("Staff not found");
		}
		const tokenMatch = await bcrypt.compare(refresh_token, staff.refresh_token);
		if (!tokenMatch) {
			throw new ForbiddenException("Forbidden!");
		}
		const { accessToken, refreshToken } = await this.generateTokens(staff);
		const hashshedRefreshToken = await bcrypt.hash(refreshToken, 7);
		await this.staffsService.updateRefreshToken(staffId, hashshedRefreshToken);
		res.cookie("refreshToken", refreshToken, {
			maxAge: Number(process.env.COOKIE_TIME),
			httpOnly: true,
		});
		return {
			message: "Staff Refresh Token updated",
			id: staffId,
			accessToken,
		};
	}
	async signOut(refreshToken: string, res: Response) {
		const staffData = await this.jwtService.verify(refreshToken, {
			secret: process.env.REFRESH_TOKEN_KEY,
		});
		if (!staffData) {
			throw new ForbiddenException("Staff not verified!");
		}
		this.staffsService.updateRefreshToken(staffData.id, null!);
		res.clearCookie("refreshToken");
		return {
			message: "Staff logged out",
		};
	}
}
