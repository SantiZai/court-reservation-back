import {
	Body,
	ConflictException,
	Controller,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { UsersService } from "src/users/users.service";

@Controller("players")
export class PlayersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async findAll(): Promise<User[]> {
		const users = await this.usersService.user().findMany();
		return users;
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<User> {
		const user = await this.usersService.user().findUnique({
			where: {
				id: parseInt(id),
			},
		});

		if (!user) {
			throw new NotFoundException(`User with id:${id} not found`);
		}
		return user;
	}

	@Post()
	async create(@Body() user: User) {
		try {
			const newUser = await this.usersService.user().create({
				data: user,
			});
			return newUser;
		} catch (err) {
			// Verificar si el error es de duplicación de clave única
			if (
				err.code === "P2002" &&
				err.meta?.target?.includes("unique constraint")
			) {
				throw new ConflictException("Email already exists");
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
			const existingUser = this.usersService.user().findUnique({
				where: {
					id: parseInt(id),
				},
			});
			if (!existingUser) {
				throw new NotFoundException(`User with id:${id} not found`);
			}
			const updatedUser = await this.usersService.user().update({
				where: {
					id: parseInt(id),
				},
				data: user,
			});
			return updatedUser;
		} catch (err) {
			console.error(err);
		}
	}
}
