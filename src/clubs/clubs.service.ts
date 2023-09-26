import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class ClubsService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	club() {
		return this.prisma.club;
	}
}
