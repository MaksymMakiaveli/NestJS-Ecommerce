import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity extends BaseEntity {
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
