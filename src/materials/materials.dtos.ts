import {IsString} from "class-validator";

export class AddMaterialDto {
  @IsString()
  title!: string;

  @IsString()
  instruction!: string;
}