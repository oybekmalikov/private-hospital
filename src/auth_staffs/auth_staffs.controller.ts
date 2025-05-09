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
import { CreateStaffDto } from "../staffs/dto/create-staff.dto";
import { AuthStaffsService } from "./auth_staffs.service";
import { StaffSignInDto } from "./dto/staff-sign-in.dto";

@Controller("auth-staffs")
export class AuthStaffsController {
	constructor(private readonly authStaffsService: AuthStaffsService) {}
	
	@Post("sign-in")
	async signIn(
		@Body() staffSignInDto: StaffSignInDto,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authStaffsService.signIn(staffSignInDto, res);
	}
	@HttpCode(200)
	@Post("sign-out")
	signOut(
		@CookieGetter("refreshToken") refreshToken: string,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authStaffsService.signOut(refreshToken, res);
	}
	@HttpCode(200)
	@Get("refresh/:id")
	async updateRefreshToken(
		@Res({ passthrough: true }) res: Response,
		@CookieGetter("refreshToken") refresh_token: string,
		@Param("id", ParseIntPipe) id: number
	) {
		return this.authStaffsService.updateRefreshToken(id, refresh_token, res);
	}
}
