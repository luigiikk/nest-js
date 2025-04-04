import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/accounts")
export class CreateAccountController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password } = body;

    const userWithSameEMail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEMail) {
      throw new ConflictException(
        "User with same e-mail addres already exists."
      );
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
