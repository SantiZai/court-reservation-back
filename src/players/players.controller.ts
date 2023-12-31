import {
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
	Req,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { PlayersService } from "./players.service";

@Controller("players")
export class PlayersController {
	constructor(
		private readonly playersService: PlayersService,
	) {}

	/*Busca si existe un usuario con el mail pasado por query*/
	@Get("exists")
	async getUser(@Query("email") email: string) {
		try {
			const existingUser = await this.playersService.player().findFirst({
				where: {
					email,
				},
			});
			if (!existingUser)
				throw new NotFoundException(`User with email: ${email} not found`);
			return existingUser;
		} catch (err) {
			return err;
		}
	}

	@Get()
	async findAll(): Promise<User[]> {
		const users = await this.playersService.player().findMany({
			include: {
				reservations: true,
			},
		});
		return users;
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<User> {
		try {
			const user = await this.playersService.player().findUnique({
				where: {
					id: parseInt(id),
				},
				include: {
					reservations: true,
				},
			});
			if (!user) throw new NotFoundException(`User with id: ${id} not found`);
			return user;
		} catch (err) {
			return err;
		}
	}

	@Post()
	async create(@Body() user: User): Promise<User> {
		try {
			const newUser = await this.playersService.player().create({
				data: user,
			});
			return newUser;
		} catch (err) {
			// Verificar si el error es de duplicación de clave única
			if (
				err.code === "P2002" &&
				err.meta?.target?.includes("unique constraint")
			) {
				throw new ConflictException("Username already exists");
			}
			throw err;
		}
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() user: Partial<User>,
	): Promise<User> {
		try {
			const existingUser = this.playersService.player().findUnique({
				where: {
					id: parseInt(id),
				},
			});
			if (!existingUser)
				throw new NotFoundException(`User with id: ${id} not found`);
			const updatedUser = await this.playersService.player().update({
				where: {
					id: parseInt(id),
				},
				data: user,
			});
			return updatedUser;
		} catch (err) {
			throw err;
		}
	}

	@Delete(":id")
	async delete(@Param("id") id: string) {
		try {
			const existingUser = await this.playersService.player().findUnique({
				where: {
					id: parseInt(id),
				},
			});
			if (existingUser) {
				await this.playersService.player().delete({
					where: {
						id: parseInt(id),
					},
				});
			} else throw new NotFoundException(`User with id: ${id} not found`);
		} catch (err) {
			throw err;
		}
	}

	@Get("bring/:email")
	async findByEmil(@Param("email") email: string): Promise<User> {
		try {
			const user = await this.playersService.player().findUnique({
				where: {
					email,
				},
				include: {
					reservations: true,
				},
			});
			if (!user)
				throw new NotFoundException(`User with email: ${email} not found`);
			return user;
		} catch (err) {
			return err;
		}
	}
}
