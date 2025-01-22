import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { OtpService } from "./otp.service";
import { Otp } from "@/common/entities/otp.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature([Otp])
  ],
  providers: [OtpService],
  exports: [OtpService, MikroOrmModule.forFeature([Otp])],
})
export class OtpModule {}