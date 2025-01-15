import { TokenizedUser } from "@/users/users.dtos";
import { Type } from "class-transformer"
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsEnum,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
  IsArray
} from "class-validator";
import { EEducationLevel } from "../common/enums/educationLevel.enums";
import { EMedium } from "../common/enums/medium.enums";
import { EDegree } from "../common/enums/degree.enums";
import { ERoles } from "../common/enums/roles.enums";
import { EGender } from "../common/enums/gender.enums";
import { EHighestEducationLevel } from "@/common/enums/highestEducationLevel.enums";
import { ITokenizedUser } from "@/auth/auth.interfaces";
import { UserProfile } from "@/common/entities/user-profiles.entity";
import { User } from "@/common/entities/users.entity";

export class LoginResponseDto {
  accessToken!: string;
  user!: TokenizedUser;
}

export class CreateStudentDto {
  @IsString()
  address!: string;

  @IsString()
  phoneNumber!: string;

  @IsEnum(EEducationLevel)
  educationLevel!: EEducationLevel;

  @ValidateIf(
    (obj) =>
      obj.educationLevel === EEducationLevel.School ||
      obj.educationLevel === EEducationLevel.College,
  )
  @IsEnum(EMedium)
  medium!: EMedium;

  @ValidateIf(
    (obj) =>
      obj.educationLevel === EEducationLevel.School ||
      obj.educationLevel === EEducationLevel.College,
  )
  @IsString()
  grade!: string;

  @ValidateIf((obj) => obj.educationLevel === EEducationLevel.University)
  @IsEnum(EDegree)
  degree!: EDegree;

  @ValidateIf((obj) => obj.educationLevel === EEducationLevel.University)
  @IsString()
  degreeName!: string;

  @ValidateIf((obj) => obj.educationLevel === EEducationLevel.University)
  @IsString()
  semesterYear!: string;
}
export class CreateTeacherDto {
  @IsString()
  code!: string;

  @IsEnum(EHighestEducationLevel)
  highestEducationLevel!: EHighestEducationLevel;

  @IsString()
  majorSubject!: string;

  @IsArray()
  subjectsToTeach!: Array<string>;
}
export class CreateUserDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsEnum(EGender)
  gender!: EGender;

  @IsEnum(ERoles)
  role!: ERoles;

  @ValidateIf((obj) => obj.role === ERoles.Student)
  @ValidateNested()
  @Type(() => CreateStudentDto)
  @IsOptional()
  studentForm!: CreateStudentDto;

  @ValidateIf((obj) => obj.role === ERoles.Teacher)
  @ValidateNested()
  @Type(() => CreateTeacherDto)
  @IsOptional()
  teacherForm!: CreateTeacherDto;
}
