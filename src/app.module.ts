import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PlayersController } from "./players/players.controller";
import { ReservationsController } from "./reservations/reservations.controller";
import { CourtsService } from "./courts/courts.service";
import { ReservationsService } from "./reservations/reservations.service";
import { CourtsController } from "./courts/courts.controller";
import { PlayersService } from "./players/players.service";

@Module({
	imports: [],
	controllers: [
		AppController,
		CourtsController,
		PlayersController,
		ReservationsController,
		ReservationsController,
	],
	providers: [AppService, PlayersService, CourtsService, ReservationsService],
})
export class AppModule {}
