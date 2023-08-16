import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { PlayersService } from "src/players/players.service";

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, "google") {
	constructor(private readonly playersService: PlayersService) {
		super({
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL,
			scope: ["email", "profile"],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback,
	): Promise<any> {
		const { name, emails, photos } = profile;
		const existUser = await this.playersService.player().findUnique({
			where: {
				email: emails[0].value,
			},
		});
		if (!existUser) {
			const newUser = {
				email: emails[0].value,
				fullname: `${name.givenName} ${name.familyName}`,
				picture: photos[0].value,
				reservations: { create: [] },
			};
			let result = await this.playersService.player().create({
				data: newUser,
			});
			done(null, { result, accessToken });
		} else done(null, { existUser, accessToken });
	}
}
