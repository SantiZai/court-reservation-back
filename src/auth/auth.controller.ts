import { Controller, Get, UseGuards, Req, Request, HttpStatus } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get("google")
	@UseGuards(AuthGuard("google"))
	async googleAuth(): Promise<any> {
		return HttpStatus.OK
	}

	@Get("google/callback")
	@UseGuards(AuthGuard("google"))
	async googleAuthRedirect(@Req() req: Request): Promise<any> {
		return this.authService.googleLogin(req);
	}
}
