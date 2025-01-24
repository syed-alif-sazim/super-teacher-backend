import { Module } from "@nestjs/common";
import { UniqueCode } from "@/common/entities/unique-code.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { CreateUniqueCodeCommand } from "./create-unique-code.command";
@Module({
  imports: [MikroOrmModule.forFeature([UniqueCode])],
  providers: [CreateUniqueCodeCommand],
  exports: [MikroOrmModule.forFeature([UniqueCode])], 
})
export class UniqueCodeModule {}
