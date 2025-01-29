import { TokenizedUser } from "@/users/users.dtos";
import { Type } from "class-transformer"
import {
  IsDate,
  IsString,
  IsEnum,
  IsArray
} from "class-validator";
import { EDays } from "@/common/enums/days.enums";
import { ESubjects } from "@/common/enums/subjects.enums";
import { ITokenizedUser } from "@/auth/auth.interfaces";


export class CreateClassroomDto {
  @IsString()
  title!: string;

  @IsArray()
  days!: string[];

  @IsEnum(ESubjects)
  subject!: ESubjects;

  @IsDate()
  @Type(() => Date)
  classTime!: Date;
}

export class AddStudentsDto {
  @IsArray()
  students!: number[];
}

