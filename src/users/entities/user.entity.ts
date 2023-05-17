import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/dataObjects';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  @ApiHideProperty()
  hash: string;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;
}
