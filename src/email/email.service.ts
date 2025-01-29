import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ClassroomsRepository } from "@/classrooms/classrooms.repository";
import { CreateClassroomDto } from "@/classrooms/classrooms.dtos";
import { TeachersRepository } from "@/teachers/teachers.repository";
import { EUserRole } from "@/common/enums/roles.enums";
import { UsersRepository } from "@/users/users.repository";
import { Classroom } from "@/common/entities/classrooms.entity";
import { SendEmailDto } from "./email.dtos";
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

@Injectable()
export class EmailService {

  async sendEmail(sendEmailDto: SendEmailDto): Promise<void> {
    try {
      await sgMail.send(sendEmailDto);
    } catch (error) {
      throw new InternalServerErrorException("Failed to send email");
    }
  }
}