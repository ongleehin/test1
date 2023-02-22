import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

@Entity({
  name: 'url',
  orderBy: {
    url: 'ASC',
    shortUrl: 'DESC',
  },
})
// need to add this entity to TypeOrmModule.forRoot in app.module.ts
export class UrlEntity extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn()
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  url: string;

  @Column({ unique: true })
  @IsOptional()
  @MaxLength(255)
  @IsString()
  shortUrl?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedDate: Date;
}
