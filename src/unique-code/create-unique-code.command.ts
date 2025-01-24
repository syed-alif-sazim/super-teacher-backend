import { Logger, Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";

import { nanoid } from 'nanoid';
import { Command, CommandRunner, Option } from "nest-commander";

import { UniqueCodeRepository } from "@/unique-code/unique-code.repository";

import { ICommandData } from "./create-unique-command.types";

@Command({
  name: "create-unique-code",
  description: "Inserts a unique code into the database for a given email",
})
@Injectable()
export class CreateUniqueCodeCommand extends CommandRunner {
  private readonly logger = new Logger(CreateUniqueCodeCommand.name);

  constructor(
    private readonly em: EntityManager,
    private readonly uniqueCodeRepository: UniqueCodeRepository,
  ) {
    super();
  }

  async run(passedParams: string[], options?: ICommandData): Promise<void> {
    const email = options?.email;
    const attemptsLeft = 3;

    if (!email) {
      this.logger.error("Email is required");
      return;
    }

    try {
      await this.em.transactional(async (em) => {
        const code = nanoid(6).toUpperCase()
        const uniqueCode = this.uniqueCodeRepository.create({
          email,
          code,
          attemptsLeft,
        });

        await em.persistAndFlush(uniqueCode);
        this.logger.log(`The unique code ${code} has been generated for the email : ${email}`);
      });
    } catch (UniqueConstraintViolationException) {
      this.logger.error("User already exists");
    }
  }

  @Option({
    flags: "-e, --email <email>",
    description: "Email of the teacher user for whom the unique code has to be created",
  })
  parseEmail(val: string): string {
    return val;
  }
}
