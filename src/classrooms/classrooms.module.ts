import { Module } from "@nestjs/common";
import { Classroom } from "@/common/entities/classrooms.entity";
import { Teacher } from "@/common/entities/teachers.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ClassroomsService } from "./classrooms.service";
import { ClassroomsController } from "./classrooms.controller";
import { User } from "@/common/entities/users.entity";
import { StudentClassroom } from "@/common/entities/students-classrooms.entity";
import { EmailService } from "@/email/email.service";
import { Student } from "@/common/entities/students.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Classroom, Teacher, User, StudentClassroom, Student])],
  controllers: [ClassroomsController],
  providers: [ClassroomsService, EmailService],
  exports: [ClassroomsService]
})
export class ClassroomsModule  {}