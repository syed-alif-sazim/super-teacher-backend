import { Type } from "class-transformer";
import {IsDate, IsString} from "class-validator";

export class AddExamDto {
  @IsString()
  title!: string;

  @IsString()
  instruction!: string;

  @IsDate()
  @Type(() => Date)
  scheduleDate!: Date;
}