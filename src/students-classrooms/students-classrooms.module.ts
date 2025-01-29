import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { StudentClassroom } from "@/common/entities/students-classrooms.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature([StudentClassroom ])
  ],
  providers: [],
  exports: [ MikroOrmModule.forFeature([StudentClassroom])],
})
export class StudentsClassroomsModule {}