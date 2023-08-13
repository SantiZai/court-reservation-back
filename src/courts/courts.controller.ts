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
import { CourtsService } from "./courts.service";
import { Court } from "@prisma/client";

@Controller("courts")
export class CourtsController {
	constructor(private readonly courtsService: CourtsService) {}

	@Get()
	async findAll(): Promise<Court[]> {
		const courts = await this.courtsService.court().findMany();
		return courts;
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<Court> {
		const court = await this.courtsService.court().findUnique({
			where: {
				id: parseInt(id),
			},
		});
		if (!court) throw new NotFoundException(`Court with id: ${id} not found`);
		return court;
	}
	@Post()
	async create(@Body() court: Court): Promise<Court> {
		try {
			const newCourt = await this.courtsService.court().create({
				data: court,
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
