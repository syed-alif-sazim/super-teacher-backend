import { Body, Controller, Post, UseGuards, UseInterceptors, BadRequestException, Get } from "@nestjs/common";
import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ITokenizedUser } from "@/auth/auth.interfaces";
import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { CreateClassroomDto } from "./classrooms.dtos";
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
}