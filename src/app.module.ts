import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PlayersController } from "./players/players.controller";
import { ReservationsController } from "./reservations/reservations.controller";
import { CourtsService } from "./courts/courts.service";
import { ReservationsService } from "./reservations/reservations.service";
import { CourtsController } from "./courts/courts.controller";
import { PlayersService } from "./players/players.service";
import { ClubsController } from "./clubs/clubs.controller";
import { ClubsService } from "./clubs/clubs.service";

@Module({
	imports: [],
	controllers: [
		AppController,
		CourtsController,
		PlayersController,
		ReservationsController,
		ReservationsController,
		ClubsController,
	],
	providers: [
		AppService,
		PlayersService,
		CourtsService,
		ReservationsService,
		ClubsService,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {}
}
