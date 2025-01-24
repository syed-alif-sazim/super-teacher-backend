import { Injectable } from "@nestjs/common";
import { ClassroomsRepository } from "@/classrooms/classrooms.repository";
import { CreateClassroomDto } from "@/classrooms/classrooms.dtos";
import { TeachersRepository } from "@/teachers/teachers.repository";
import { EUserRole } from "@/common/enums/roles.enums";
import { UsersRepository } from "@/users/users.repository";
import { Classroom } from "@/common/entities/classrooms.entity";

@Injectable()
export class ClassroomsService {
  constructor(
    private readonly classroomsRepository: ClassroomsRepository,
    private readonly teachersRepository: TeachersRepository,
    private readonly usersRepository: UsersRepository
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
}