import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { Reservation } from "@prisma/client";

@Controller("reservations")
export class ReservationsController {
	constructor(private readonly reservationsService: ReservationsService) {}

	@Get()
	async findAll(): Promise<Reservation[]> {
		const reservations = await this.reservationsService
			.reservation()
			.findMany();
		return reservations;
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<Reservation> {
		const reservation = await this.reservationsService
			.reservation()
			.findUnique({
				where: {
					id: parseInt(id),
				},
			});
		if (!reservation)
			throw new NotFoundException(`Reservation with id: ${id} not found`);
		return reservation;
	}
	
	@Post()
	async create(@Body() reservation: Reservation): Promise<Reservation> {
		try {
			const newReservation = await this.reservationsService
				.reservation()
				.create({
					data: reservation,
				});
			return newReservation;
		} catch (err) {
			throw err;
		}
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() reservation: Partial<Reservation>,
	): Promise<Reservation> {
		try {
			const existingReservation = this.reservationsService
				.reservation()
				.findUnique({
					where: {
						id: parseInt(id),
					},
				});
			if (!existingReservation)
				throw new NotFoundException(`Reservation with id: ${id} not found`);
			const updatedReservation = await this.reservationsService
				.reservation()
				.update({
					where: {
						id: parseInt(id),
					},
					data: reservation,
				});
			return updatedReservation;
		} catch (err) {
			throw err;
		}
	}

	@Delete(":id")
	async delete(@Param("id") id: string) {
		try {
			const existingReservation = await this.reservationsService
				.reservation()
				.findUnique({
					where: {
						id: parseInt(id),
					},
				});
			if (existingReservation) {
				await this.reservationsService.reservation().delete({
					where: {
						id: parseInt(id),
					},
				});
			} else
				throw new NotFoundException(`Reservation with id: ${id} not found`);
		} catch (err) {
			throw err;
		}
	}
}
