import { Injectable, NotFoundException } from "@nestjs/common";
import { ClassroomsRepository } from "@/classrooms/classrooms.repository";
import { AddStudentsDto, CreateClassroomDto } from "@/classrooms/classrooms.dtos";
import { TeachersRepository } from "@/teachers/teachers.repository";
import { EUserRole } from "@/common/enums/roles.enums";
import { UsersRepository } from "@/users/users.repository";
import { Classroom } from "@/common/entities/classrooms.entity";
import { StudentsRepository } from "@/students/students.repository";
import { StudentsClassroomsRepository } from "@/students-classrooms/students-classrooms.repository";
import { EmailService } from "@/email/email.service";
import { AddMaterialDto } from "./materials.dtos";
import { FileUploadsService } from "@/file-uploads/file-uploads.service";
import { MaterialsRepository } from "./materials.repository";
import { ClassroomsService } from "@/classrooms/classrooms.service";
import { Materials } from "@/common/entities/materials.entity";

@Injectable()
export class MaterialsService {
  constructor(
    private readonly classroomsRepository: ClassroomsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly studentsRepository: StudentsRepository,
    private readonly studentsClassroomsRepository: StudentsClassroomsRepository,
    private readonly materialsRepository: MaterialsRepository,
    private readonly emailService: EmailService,
    private readonly classroomsService: ClassroomsService,
    private readonly fileUploadService: FileUploadsService
  ) {}

    async addMaterial(classroomId: number, addMaterialDto: AddMaterialDto,file: Express.Multer.File) {
        const fileUrl =await this.fileUploadService.processFileUpload(file)
        const classroom=await this.classroomsRepository.findOneOrFail({id: classroomId})
        const material = this.materialsRepository.create({
            ...addMaterialDto,
            fileUrl,
            classroom: classroom
        })
        await this.materialsRepository.getEntityManager().persistAndFlush(material)

        const enrolledStudents =await this.classroomsService.getEnrolledStudents(classroomId)

        enrolledStudents.map((student)=>{
          this.emailService.sendEmail({
            to: student.user.email,
            from: process.env.SENDGRID_EMAIL!,
            subject: `${classroom.title} class`,
            text: `A material has been uploaded in the ${classroom.title} classroom.`,
          });
        })
    }

    async getAllMaterials(classroomId: number): Promise<Materials[]> { 
      const materials = await this.materialsRepository.find(
        { classroom: classroomId },
        { orderBy: { createdAt: "ASC" } }
      );
    
      const materialsWithDownloadUrl = await Promise.all(
        materials.map(async (material) => {
          const fileKey = material.fileUrl.split("project-dev-bucket/")[1];
          const downloadUrl = await this.fileUploadService.generateDownloadUrl(fileKey);
          return {
            ...material,
            downloadUrl,
          };
        })
      );
    
      return materialsWithDownloadUrl;
    }
}