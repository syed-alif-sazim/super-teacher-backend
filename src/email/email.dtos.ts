import { TokenizedUser } from "@/users/users.dtos";
import { Type } from "class-transformer"
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export class SendEmailDto {
    @IsEmail()
    to!: string;

    @IsEmail()
    from!: string;

    @IsString()
    subject!: string;

    @IsString()
    text!: string;

    @IsOptional()
    @IsString()
    html?: string;
}