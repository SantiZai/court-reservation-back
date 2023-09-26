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
import { ClubsService } from "./clubs.service";
import { Club, Sport } from "@prisma/client";

@Controller("clubs")
export class ClubsController {
	constructor(private readonly clubsService: ClubsService) {}

	@Get()
	async findAll(): Promise<Club[]> {
		const clubs = await this.clubsService.club().findMany(/* {
            include: {
                courts: true
            }
        } */);
		return clubs;
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<Club> {
		const club = await this.clubsService.club().findUnique({
			where: {
				id: parseInt(id),
			},
		});
		if (!club) throw new NotFoundException(`Club with id: ${id} not found`);
		return club;
	}

	/*Buscar club según zona y deporte*/
	@Get("search/results")
	async filterForSport(
		@Query("sport") sport: Sport,
		@Query("country") country: string,
		@Query("province") province: string,
		@Query("city") city: string,
	): Promise<Club[]> {
		const clubs = await this.clubsService.club().findMany({
			where: {
				sports: {
					hasSome: [sport],
				},
				country,
				province,
				city,
			},
		});
		if (!clubs) throw new NotFoundException(`Club with ${sport} not found`);
		return clubs;
	}

	@Post()
	async create(@Body() club: Club): Promise<Club> {
		try {
			const newClub = await this.clubsService.club().create({
				data: club,
			});
			return newClub;
		} catch (err) {
			throw err;
		}
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() club: Partial<Club>,
	): Promise<Club> {
		try {
			const existingClub = await this.clubsService.club().findUnique({
				where: {
					id: parseInt(id),
				},
			});
			if (!existingClub)
				throw new NotFoundException(`Club with id ${id} not found`);
			const updatedClub = await this.clubsService.club().update({
				where: {
					id: parseInt(id),
				},
				data: club,
			});
			return updatedClub;
		} catch (err) {
			throw err;
		}
	}

	@Delete(":id")
	async delete(@Param("id") id: string) {
		try {
			const existingClub = await this.clubsService.club().findUnique({
				where: {
					id: parseInt(id),
				},
			});
			if (existingClub) {
				await this.clubsService.club().delete({
					where: {
						id: parseInt(id),
					},
				});
			} else throw new NotFoundException(`Club with id ${id} not found`);
		} catch (err) {
			throw err;
		}
	}
}
