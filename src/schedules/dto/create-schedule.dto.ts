import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, Matches } from "class-validator";

export class CreateScheduleDto {
	@ApiProperty({
		example: 1,
		description: "Doctor's ID",
	})
	@IsInt({ message: "doctor_id must be an integer" })
	doctor_id: number;

	@ApiProperty({
		example: "Monday",
		description: "Day of the week for the schedule",
	})
	@IsEnum(
		[
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday",
		],
		{ message: "Wrong weekday" }
	)
	weekday: string;

	@ApiProperty({
		example: "09:00",
		description: "Start time of the schedule",
	})
	@Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
		message: "Wrong time format",
	})
	start_time: string;

	@ApiProperty({
		example: "17:00",
		description: "End time of the schedule",
	})
	@Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
		message: "Wrong time format",
	})
	end_time: string;
}
