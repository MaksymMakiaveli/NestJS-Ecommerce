import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared';
import { ApiProperty } from '@nestjs/swagger';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @ApiProperty()
  @Column({
    unique: true,
  })
  title: string;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  rating: number;

  @ApiProperty()
  @Column()
  stock: number;
}
