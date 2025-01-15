import { Module } from "@nestjs/common";
import { UniqueCodeRepository } from "@/unique-code/unique-code.repository";
import { UniqueCode } from "@/common/entities/unique-code.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";

@Module({
  imports: [MikroOrmModule.forFeature([UniqueCode])],
  exports: [MikroOrmModule.forFeature([UniqueCode])],  // Exporting the repository to be used in other moduless
})
export class UniqueCodeModule {}
