import { Body, Controller, Post, UseGuards, UseInterceptors, BadRequestException, Get, Param, Delete, UploadedFile } from "@nestjs/common";
import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { AddMaterialDto } from "./materials.dtos";
import { MaterialsService } from "./materials.service";
import { FileInterceptor } from "@nestjs/platform-express";

@UseInterceptors(ResponseTransformInterceptor)
// @UseGuards(JwtAuthGuard)
@Controller("classrooms")
export class MaterialsController {
  constructor(
    private readonly materialsService: MaterialsService,
  ) {}

  @Post(':id/materials')
  @UseInterceptors(FileInterceptor("file"))
  async addMaterial(
    @Param("id") classroomId: number,
    @Body() addMaterialDto: any,
    @UploadedFile() file: Express.Multer.File){
        return this.materialsService.addMaterial(classroomId, addMaterialDto, file)
  }

  @Get(':id/materials')
  async getAllMaterials(@Param("id") classroomId: number){
      return this.materialsService.getAllMaterials(classroomId)
  }

}