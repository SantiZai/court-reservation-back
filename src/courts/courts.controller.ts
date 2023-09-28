import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import { CourtsService } from "./courts.service";
import { Club, Court } from "@prisma/client";
import { ClubsService } from "src/clubs/clubs.service";

@Controller("courts")
export class CourtsController {
	constructor(
		private readonly courtsService: CourtsService,
		private readonly clubsService: ClubsService,
	) {}

	@Get()
	async findAll(@Query("club") club: string): Promise<Court[]> {
		const existingClub: Club = await this.clubsService.club().findFirst({
			where: {
				name: club,
			},
		});
		const courts = await this.courtsService.court().findMany({
			where: {
				clubId: existingClub.id,
			},
			include: {
				reservations: true,
			},
		});
		return courts;
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<Court> {
		const court = await this.courtsService.court().findUnique({
			where: {
				id: parseInt(id),
			},
			include: {
				reservations: true,
			},
		});
		if (!court) throw new NotFoundException(`Court with id: ${id} not found`);
		return court;
	}

	@Post()
	async create(@Body() court: Court): Promise<Court> {
		try {
			const newCourt = await this.courtsService.court().create({
				data: {
					...court,
					reservations: { create: [] },
				},
				include: {
					reservations: true,
				},
			});
			return newCourt;
		} catch (err) {
			throw err;
		}
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() court: Partial<Court>,
	): Promise<Court> {
		try {
			const existingCourt = this.courtsService.court().findUnique({
				where: {
					id: parseInt(id),
				},
			});
			if (!existingCourt)
				throw new NotFoundException(`Court with id: ${id} not found`);
			const updatedCourt = await this.courtsService.court().update({
				where: {
					id: parseInt(id),
				},
				data: court,
			});
			return updatedCourt;
		} catch (err) {
			throw err;
		}
	}

	@Delete(":id")
	async delete(@Param("id") id: string) {
		try {
			const existingCourt = await this.courtsService.court().findUnique({
				where: {
					id: parseInt(id),
				},
			});
			if (existingCourt) {
				await this.courtsService.court().delete({
					where: {
						id: parseInt(id),
					},
				});
			} else throw new NotFoundException(`Court with id: ${id} not found`);
		} catch (err) {
			throw err;
		}
	}
}
