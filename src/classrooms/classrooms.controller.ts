import { Body, Controller, Post, UseGuards, UseInterceptors, BadRequestException, Get, Param, Delete } from "@nestjs/common";
import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ITokenizedUser } from "@/auth/auth.interfaces";
import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { AddStudentsDto, CreateClassroomDto } from "./classrooms.dtos";
import { ClassroomsService } from "./classrooms.service";

@UseInterceptors(ResponseTransformInterceptor)
@UseGuards(JwtAuthGuard)
@Controller("classrooms")
export class ClassroomsController {
  constructor(
    private readonly classroomsService: ClassroomsService,
  ) {}

  @Post()
  async createClassroom(@CurrentUser() user: ITokenizedUser, @Body() createClassroomDto: CreateClassroomDto) {
    if (user.roleId === null) {
      throw new BadRequestException('Teacher ID cannot be null');
    }
    const res = await this.classroomsService.createClassroom(user.roleId, createClassroomDto);

    return res;
  }

  @Get()
  getClassrooms(@CurrentUser() user: ITokenizedUser) {
    if (user.roleId === null) {
      throw new BadRequestException('ID cannot be null');
    }
    return this.classroomsService.getClassrooms(user.userId, user.role);
  }

  @Get(":id/teacher")
  getClassroomTeacher(@Param("id") id: number) {
    const teacher= this.classroomsService.getClassroomTeacher(id);

    return teacher;
  }

  @Get(":id/enrolled-students")
  getEnrolledStudents(@Param("id") id: number) {
    const students = this.classroomsService.getEnrolledStudents(id);

    return students;
  }

  @Get(":id/unenrolled-students")
  getUnenrolledStudents(@Param("id") id: number) {
    const students = this.classroomsService.getUnenrolledStudents(id);

    return students;
  }

  @Post(":id/students")
  addStudents(@Param("id") id: number, @Body() addStudentsDto: AddStudentsDto) {
    return this.classroomsService.addStudents(id, addStudentsDto);
  }

  @Delete(":id/students")
  removeStudent(@Param("id") classroomId: number,@Body() data : {studentId : number}) {
    console.log(data.studentId)
    return this.classroomsService.removeStudent(classroomId, data.studentId);
  }
}