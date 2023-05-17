import { ApiProperty } from '@nestjs/swagger';

export class GlobalResponse<T> {
  @ApiProperty({ type: 'number', description: '1xx, 2xx, 3xx, 4xx, 5xx' })
  statusCode: number;

  @ApiProperty({ nullable: true })
  message: string | null;

  @ApiProperty()
  code: string;

  @ApiProperty({ type: Date })
  timestamp: string;

  @ApiProperty()
  path: string;

  @ApiProperty({ description: 'GET, POST, PUT, DELETE' })
  method: string;

  @ApiProperty()
  result: T;
}
