import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.use(cors());
	app.use(cookieParser());
	await app.listen(process.env.PORT, "0.0.0.0");
}
bootstrap();
