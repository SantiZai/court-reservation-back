import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class AuthService {
	private readonly googleAPI =
		"https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos";

	googleLogin(req) {
		if (!req.user) {
			return "No user from google";
		}
		return {
			message: "User info from google",
			user: req.user,
		};
	}

	async getGoogleProfileData(token: string) {
		try {
			const res = await axios.get(this.googleAPI, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const userData = {
				name: res.data.names[0].displayName,
				email: res.data.emailAddresses[0].value,
				picture: res.data.photos[0].url,
			};
			return userData
		} catch (err) {
			if (err instanceof TypeError && err.message.includes("circular")) {
				return { error: "Circular JSON" };
			}
			return { error: "Error in API call" };
		}
	}
}
