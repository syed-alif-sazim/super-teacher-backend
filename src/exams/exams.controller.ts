import { Body, Controller, Post, UseGuards, UseInterceptors, BadRequestException, Get, Param, Delete, UploadedFile } from "@nestjs/common";
import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { AddExamDto } from "./exams.dtos";
import { ExamsService } from "./exams.service";
import { FileInterceptor } from "@nestjs/platform-express";

@UseInterceptors(ResponseTransformInterceptor)
@UseGuards(JwtAuthGuard)
@Controller("classrooms")
export class ExamsController {
  constructor(
    private readonly examsService: ExamsService,
  ) {}

  @Post(':id/exams')
  @UseInterceptors(FileInterceptor("file"))
  async addExam(
    @Param("id") classroomId: number,
    @Body() addExamDto: AddExamDto,
    @UploadedFile() file: Express.Multer.File){
        return this.examsService.addExam(classroomId, addExamDto, file)
  }

  @Get(':id/exams')
  async getAllExams(@Param("id") classroomId: number){
      return this.examsService.getAllExams(classroomId)
  }

}