import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PlayersController } from "./players/players.controller";
import { ReservationsController } from "./reservations/reservations.controller";
import { CourtsService } from "./courts/courts.service";
import { ReservationsService } from "./reservations/reservations.service";
import { CourtsController } from "./courts/courts.controller";
import { PlayersService } from "./players/players.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { GoogleOAuthStrategy } from "./auth/strategies/google-oauth.strategy";
import { AuthMiddleware } from "./auth/auth.middleware";

@Module({
	imports: [],
	controllers: [
		AppController,
		CourtsController,
		PlayersController,
		ReservationsController,
		ReservationsController,
		AuthController,
	],
	providers: [
		AppService,
		PlayersService,
		CourtsService,
		ReservationsService,
		AuthService,
		GoogleOAuthStrategy,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes("protected-route");
	}
}
