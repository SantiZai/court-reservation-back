import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class CourtsService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	court() {
		return this.prisma.court;
	}
}
