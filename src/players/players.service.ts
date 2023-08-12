import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PlayersService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	player() {
		return this.prisma.user;
	}
}
