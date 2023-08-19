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
	Req,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { PlayersService } from "./players.service";
import { AuthService } from "src/auth/auth.service";
import { Request } from "express";

@Controller("players")
export class PlayersController {
	constructor(
		private readonly playersService: PlayersService,
		private readonly authService: AuthService,
	) {}

	@Get("profile")
	async getProfile(@Req() req: Request): Promise<any> {
		try {
			const userData = await this.authService.getGoogleProfileData(req.cookies.access_token);
			return userData;
		} catch (err) {
			return err;
		}
	}


	@Get()
	async findAll(): Promise<User[]> {
		const users = await this.playersService.player().findMany();
		return users
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
}
