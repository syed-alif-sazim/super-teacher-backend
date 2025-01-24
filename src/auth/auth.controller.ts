import { Body, Controller, Post, UseGuards, UseInterceptors, BadRequestException } from "@nestjs/common";

import { User } from "@/common/entities/users.entity";
import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";

import { CreateUserDto, LoginResponseDto, ResetPasswordDto, VerifyOtpDto } from "./auth.dtos";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { makeTokenizedUser } from "./auth.helpers";
import { OtpService } from "@/otp/otp.service";
import { UsersService } from "@/users/users.service";
import { verify } from "crypto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly otpService: OtpService,
    private readonly userService: UsersService
  ) {}

  @Post("register")
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const res = await this.authService.registerUser(createUserDto);

    return res;

  }

  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ResponseTransformInterceptor)
  @Post("login")
  async login(@CurrentUser() user: User): Promise<LoginResponseDto> {
    const accessToken = await this.authService.createAccessToken(user);
    
    return {
      accessToken,
      user: makeTokenizedUser(user),
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() email: { email: string }) {
    const exists = await this.userService.checkIfEmailExists(email.email);
    
    if (!exists) {
      throw new BadRequestException('Email is not registered');
    }
    await this.otpService.generateAndSendOtp(email.email);
    return { message: 'OTP sent to email' };
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<boolean> {
    console.log(verifyOtpDto)
    return await this.otpService.verifyOtp(verifyOtpDto);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto : ResetPasswordDto,
  ) {
    await this.authService.resetPassword(resetPasswordDto);
    return { message: 'Password reset successfully' };
  }
}
