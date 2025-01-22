import { BadRequestException, Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/core";
import { OtpRepository } from "./otp.respository";
import { VerifyOtpDto } from "@/auth/auth.dtos";
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

@Injectable()
export class OtpService {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly otpRepository: OtpRepository,
    ) {}
  
    async generateAndSendOtp(email: string): Promise<void> {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); 

      const otp = this.otpRepository.create({
        email,
        code: otpCode,
        used: false,
      });
      await this.otpRepository.getEntityManager().persistAndFlush(otp);

      const msg = {
        to: email,
        from: 'syed.alif@sazim.io',
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otpCode}. It will expire in 10 minutes.`,
        html: `<p>Your OTP code is <strong>${otpCode}</strong>. It will expire in 10 minutes.</p>`,
      };

      try {
        await sgMail.send(msg);
      } catch (error) {
      }
    }

    async verifyOtp(verifyOtpDto : VerifyOtpDto): Promise<boolean> {
      const {email, code} = verifyOtpDto;
      const otp = await this.otpRepository.findOne({ email, code, used: false }, { orderBy: { createdAt: 'DESC' } });
  
      if (!otp) {
        throw new BadRequestException('Invalid OTP');
      }
  
      const expiryTime = new Date(otp.createdAt.getTime() + 10 * 60 * 1000);
      if (new Date() > expiryTime) {
        throw new BadRequestException('OTP expired');
      }
  
      otp.used = true;
      await this.otpRepository.getEntityManager().persistAndFlush(otp);
      return true;
    }
}
