import { Body, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";

import { User } from "@/common/entities/users.entity";
import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";

import { CreateUserDto, LoginResponseDto } from "./auth.dtos";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  registerUser(@Body() createUserDto: CreateUserDto) {
    this.authService.registerUser(createUserDto);
  }
}
