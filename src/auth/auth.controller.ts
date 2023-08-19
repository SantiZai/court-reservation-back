import {
	Controller,
	Get,
	UseGuards,
	Req,
	HttpStatus,
	Res,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get("google")
	@UseGuards(AuthGuard("google"))
	async googleAuth(): Promise<any> {
		return HttpStatus.OK;
	}

	@Get("google/callback")
	@UseGuards(AuthGuard("google"))
	async googleAuthRedirect(
		@Res() res: Response,
		@Req() req: any,
	): Promise<any> {
		const accessToken = req.user.accessToken;
		const userId = req.user.existUser.id;
		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + 30);
		res.cookie("access_token", accessToken, {
			httpOnly: true,
			domain: process.env.HOST,
			expires: expirationDate,
			//TODO: hacer la cookie segura
			//secure: true,
		});
		res.cookie("user_id", userId, {
			httpOnly: true,
			domain: process.env.HOST,
			expires: expirationDate,
			//secure: true,
		});
		res.send({
			message: "Logged in successfully!",
			data: this.authService.googleLogin(req),
		});
	}
}
