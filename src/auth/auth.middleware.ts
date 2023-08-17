import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const accessToken = req.cookies.access_token;
		if (!accessToken) return res.status(401).send("Unauthorized");
		next();
	}
}
