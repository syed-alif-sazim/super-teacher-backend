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

@Injectable()
export class ClassroomsService {
  constructor(
    private readonly classroomsRepository: ClassroomsRepository,
    private readonly teachersRepository: TeachersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly studentsRepository: StudentsRepository,
    private readonly studentsClassroomsRepository: StudentsClassroomsRepository,
    private readonly emailService: EmailService,
  ) {}

   async createClassroom(teacherId: number, createClassroomDto: CreateClassroomDto) {
    const teacher = await this.teachersRepository.findOneOrFail({ id: teacherId });

    const classroom = this.classroomsRepository.create({
      ...createClassroomDto,
      teacher,
    });

    await this.classroomsRepository.getEntityManager().persistAndFlush(classroom);

    return classroom;
   }

   async getClassrooms(userId: number, userRole: string) {
    let classrooms: Classroom[] = [];
  
    const user = await this.usersRepository.findOneOrFail({ id: userId });
    
    if (userRole === EUserRole.Teacher) {
      classrooms = await this.classroomsRepository.find({ teacher: user.teacher });
    }
    return classrooms;
  }

  async addStudents(classroomId: number, addStudentsDto: AddStudentsDto) {
    const students = await this.studentsRepository.find(
      { id: { $in: addStudentsDto.students } },
      { populate: ['user'] },
    );

    const classroom = await this.classroomsRepository.findOneOrFail({ id: classroomId });

    const studentsClassrooms = students.map(student => 
      this.studentsClassroomsRepository.create({
        student: student.id,
        classroom: classroomId,
      })
    );
    await this.studentsClassroomsRepository.getEntityManager().persistAndFlush(studentsClassrooms);
    
    students.map(student => {
      this.emailService.sendEmail({
        to: student.user.email,
        from: process.env.SENDGRID_EMAIL,
        subject: `Enrollment in ${classroom.title} class`,
        text: `You have been added in the ${classroom.title} classroom in superteacher.`,
      });
    });
  }

  async getUnenrolledStudents(classroomId: number) {
    const enrolledStudentIds = (
      await this.studentsClassroomsRepository.find({ classroom: classroomId })
    ).map(studentClassroom => studentClassroom.student.id);
    
    const unenrolledStudents = await this.studentsRepository.find(
      {id: { $nin: enrolledStudentIds }},
      {populate: ['user'] },
    );

    return unenrolledStudents
  }

  async getEnrolledStudents(classroomId: number) {
    const enrolledStudentIds = (
      await this.studentsClassroomsRepository.find({ classroom: classroomId })
    ).map(studentClassroom => studentClassroom.student.id);
    
    const enrolledStudents = await this.studentsRepository.find(
      {id: { $in: enrolledStudentIds }},
      {populate: ['user'] },
    );

    return enrolledStudents
  }

  async getClassroomTeacher(classroomId: number) {
    const classroomTeacher = await this.classroomsRepository.findOne(
      {id: classroomId} ,
      {populate: ['teacher.user']},
    );

    if(!classroomTeacher){
      throw new NotFoundException();
    }
  
    return classroomTeacher;
  }

  async removeStudent(classroomId: number, studentId: number){
    const studentClassroom =await this.studentsClassroomsRepository.findOneOrFail({classroom: classroomId, student: studentId})

    if(!studentClassroom){
      throw new NotFoundException();
    }

    await this.studentsClassroomsRepository.getEntityManager().removeAndFlush(studentClassroom )
  }
  
}