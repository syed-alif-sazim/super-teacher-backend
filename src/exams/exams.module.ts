import { Module } from "@nestjs/common";
import { Classroom } from "@/common/entities/classrooms.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "@/common/entities/users.entity";
import { StudentClassroom } from "@/common/entities/students-classrooms.entity";
import { EmailService } from "@/email/email.service";
import { Student } from "@/common/entities/students.entity";
import { Materials } from "@/common/entities/materials.entity";
import { FileUploadsService } from "@/file-uploads/file-uploads.service";
import { EmailModule } from "@/email/email.module";
import { FileUploadsModule } from "@/file-uploads/file-uploads.module";
import { ClassroomsModule } from "@/classrooms/classrooms.module";
import { Exams } from "@/common/entities/exams.entity";
import { ExamsController } from "./exams.controller";
import { ExamsService } from "./exams.service";

@Module({
  imports: [EmailModule, FileUploadsModule, ClassroomsModule, MikroOrmModule.forFeature([Exams, Classroom, StudentClassroom, Student, User])],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService]
})
export class ExamsModule  {}