import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponse {
  @ApiProperty()
  field: string;

  @ApiProperty()
  errors: string[];
}
