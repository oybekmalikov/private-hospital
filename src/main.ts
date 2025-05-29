import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
// import { ErrorHandler } from "./common/error_handling/errorhandler";
// import { LoggerService } from "./common/logger/logger.service";
async function start() {
	try {
		const PORT = process.env.PORT || 3030;
		const HOST = process.env.HOST || "localhost";

		const app = await NestFactory.create(AppModule);
		app.useGlobalPipes(new ValidationPipe());
		app.setGlobalPrefix("api");
		app.use(cookieParser());
		app.enableCors({
			origin: (origin, callback) => {
				const allowedOrigins = [
					"http://3.149.47.149:3000",
					"http://localhost:3000",
					"https://private-hospital.uz",
				];
				if (!origin || allowedOrigins.includes(origin)) {
					callback(null, true);
				} else {
					callback(new BadRequestException("Not allowed by CORS"));
				}
			},
			methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
			credentials: true,
		});
		const config = new DocumentBuilder()
			.setTitle("Private Hospital Project")
			.setDescription("Discount REST API")
			.setVersion("1.0")
			.addTag("Nest JS", "Swagger")
			.addTag("Validation", "Guard")
			.addBearerAuth()
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup("api/docs", app, document);
		// const logger = app.get(LoggerService);
		// app.useGlobalFilters(new ErrorHandler(logger));
		await app.listen(PORT, () => {
			console.log(`Server started on http://${HOST}:${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
}
start();
