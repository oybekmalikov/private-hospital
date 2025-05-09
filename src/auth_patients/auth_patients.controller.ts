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
import { CreatePatientDto } from "../patients/dto/create-patient.dto";
import { AuthPatientsService } from "./auth_patients.service";
import { PatientSignInDto } from "./dto/patient-sign-in.dto";

@Controller("auth-patients")
export class AuthPatientsController {
	constructor(private readonly authPatientsService: AuthPatientsService) {}
	@Post("sign-up")
	async signUp(@Body() createPatientDto: CreatePatientDto) {
		return this.authPatientsService.signUp(createPatientDto);
	}
	@Post("sign-in")
	async signIn(
		@Body() patientSignInDto: PatientSignInDto,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authPatientsService.signIn(patientSignInDto, res);
	}
	@HttpCode(200)
	@Post("sign-out")
	signOut(
		@CookieGetter("refreshToken") refreshToken: string,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authPatientsService.signOut(refreshToken, res);
	}
	@HttpCode(200)
	@Get("refresh/:id")
	async updateRefreshToken(
		@Res({ passthrough: true }) res: Response,
		@CookieGetter("refreshToken") refresh_token: string,
		@Param("id", ParseIntPipe) id: number
	) {
		return this.authPatientsService.updateRefreshToken(id, refresh_token, res);
	}
}
