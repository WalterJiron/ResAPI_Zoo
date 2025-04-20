import { BadRequestException } from "@nestjs/common";

export class ValidationService {
  static async verifiedResult(result, messageInclude): Promise<{ message: string }> {
    if (!result[0].message.includes(messageInclude)) {
      throw new BadRequestException({ message: result[0].message });
    }

    return { message: result[0].message };
  }

  static verifiedResultForID(result, messageInclude) {
    const { message, code } = result[0];

    if (!message.includes(messageInclude)) {
      throw new BadRequestException(message);
    }

    return { message, code };
  }


  static formatTime(timeValue: string): string {

    const parts = timeValue.split(':');

    if (parts.length === 1) {
      return `${timeValue}:00:00`;
    }

    if (parts.length === 2) {
      return `${timeValue}:00`;
    }

    return timeValue;
  }

}
