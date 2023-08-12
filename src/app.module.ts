import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CourtsController } from "./courts/courts.controller";
import { PlayersController } from "./players/players.controller";
import { ReservationsController } from "./reservations/reservations.controller";
import { UsersService } from "./users/users.service";

@Module({
	imports: [],
	controllers: [
		AppController,
		CourtsController,
		PlayersController,
		ReservationsController,
	],
	providers: [AppService, UsersService],
})
export class AppModule {}
