import { Controller, Get } from "@nestjs/common";

@Controller("players")
export class PlayersController {
	@Get()
	findAll(): string {
		return "This action returns all players";
	}
}
