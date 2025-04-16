import { BadRequestException } from "@nestjs/common";

export class ValidationService {
   static async verifiedResult(result, messageInclude): Promise<{ message: string }> {
      if (!result[0].message.includes(messageInclude)) {
      throw new BadRequestException({ message: result[0].message });
    }

    return { message: result[0].message };
  }
}