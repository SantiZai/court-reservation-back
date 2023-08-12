import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class ReservationsService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	reservation() {
		return this.prisma.reservation;
	}
}
