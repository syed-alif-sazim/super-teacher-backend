import { Module } from "@nestjs/common";
import { Classroom } from "@/common/entities/classrooms.entity";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "@/common/entities/users.entity";
import { StudentClassroom } from "@/common/entities/students-classrooms.entity";
import { EmailService } from "@/email/email.service";
import { Student } from "@/common/entities/students.entity";
import { Materials } from "@/common/entities/materials.entity";
import { MaterialsController } from "./materials.controller";
import { MaterialsService } from "./materials.service";
import { FileUploadsService } from "@/file-uploads/file-uploads.service";
import { EmailModule } from "@/email/email.module";
import { FileUploadsModule } from "@/file-uploads/file-uploads.module";
import { ClassroomsModule } from "@/classrooms/classrooms.module";

@Module({
  imports: [EmailModule, FileUploadsModule, ClassroomsModule, MikroOrmModule.forFeature([Materials, Classroom, StudentClassroom, Student, User])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
  exports: [MaterialsService]
})
export class MaterialsModule  {}