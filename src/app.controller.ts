import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getDefault(): string {
		return this.appService.getHello();
	}

	@Get("protected-route")
	getHello(): string {
		return this.appService.getHello();
	}
}
