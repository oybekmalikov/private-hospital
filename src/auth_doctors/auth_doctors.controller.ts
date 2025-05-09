import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Res,
} from "@nestjs/common";
import { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { AuthDoctorsService } from "./auth_doctors.service";
import { DoctorSignInDto } from "./dto/doctor-sign-in.dto";

@Controller("auth-doctors")
export class AuthDoctorsController {
	constructor(private readonly authDoctorsService: AuthDoctorsService) {}

	@Post("sign-in")
	async signIn(
		@Body() doctorSignInDto: DoctorSignInDto,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authDoctorsService.signIn(doctorSignInDto, res);
	}
	@HttpCode(200)
	@Post("sign-out")
	signOut(
		@CookieGetter("refreshToken") refreshToken: string,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authDoctorsService.signOut(refreshToken, res);
	}
	@HttpCode(200)
	@Get("refresh/:id")
	async updateRefreshToken(
		@Res({ passthrough: true }) res: Response,
		@CookieGetter("refreshToken") refresh_token: string,
		@Param("id", ParseIntPipe) id: number
	) {
		return this.authDoctorsService.updateRefreshToken(id, refresh_token, res);
	}
}
