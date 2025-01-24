import { Module } from "@nestjs/common";
import { Classroom } from "@/common/entities/classrooms.entity";
import { Teacher } from "@/common/entities/teachers.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ClassroomsService } from "./classrooms.service";
import { ClassroomsController } from "./classrooms.controller";
import { User } from "@/common/entities/users.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Classroom, Teacher, User])],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
  exports: [ClassroomsService]
})
export class ClassroomsModule  {}