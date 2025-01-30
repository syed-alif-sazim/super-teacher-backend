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
import { AddExamDto } from "./exams.dtos";
import { FileUploadsService } from "@/file-uploads/file-uploads.service";
import { ExamsRepository } from "./exams.respository";
import { ClassroomsService } from "@/classrooms/classrooms.service";
import { Materials } from "@/common/entities/materials.entity";
import { Exams } from "@/common/entities/exams.entity";

@Injectable()
export class ExamsService {
  constructor(
    private readonly classroomsRepository: ClassroomsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly studentsRepository: StudentsRepository,
    private readonly studentsClassroomsRepository: StudentsClassroomsRepository,
    private readonly examsRepository: ExamsRepository,
    private readonly emailService: EmailService,
    private readonly classroomsService: ClassroomsService,
    private readonly fileUploadService: FileUploadsService
  ) {}

    async addExam(classroomId: number, addExamDto: AddExamDto,file: Express.Multer.File) {
        const fileUrl =await this.fileUploadService.processFileUpload(file)
        const classroom=await this.classroomsRepository.findOneOrFail({id: classroomId})
        const exam = this.examsRepository.create({
            ...addExamDto,
            fileUrl,
            classroom: classroom
        })
        await this.examsRepository.getEntityManager().persistAndFlush(exam)

        const enrolledStudents =await this.classroomsService.getEnrolledStudents(classroomId)

        enrolledStudents.map((student)=>{
          this.emailService.sendEmail({
            to: student.user.email,
            from: process.env.SENDGRID_EMAIL!,
            subject: `${classroom.title} class`,
            text: `A new exam has been scheduled in the ${classroom.title} classroom.`,
          });
        })
    }

    async getAllExams(classroomId: number): Promise<Exams[]> { 
      const exams = await this.examsRepository.find(
        { classroom: classroomId },
        { orderBy: { createdAt: "ASC" } }
      );
    
      const examsWithDownloadUrl = await Promise.all(
        exams.map(async (exam) => {
          const fileKey = exam.fileUrl.split("project-dev-bucket/")[1];
          const downloadUrl = await this.fileUploadService.generateDownloadUrl(fileKey);
          return {
            ...exam,
            downloadUrl,
          };
        })
      );
    
      return examsWithDownloadUrl;
    }
}