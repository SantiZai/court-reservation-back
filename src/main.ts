import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as cors from "cors";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.use(cors());
	await app.listen(3000);
}
bootstrap();
