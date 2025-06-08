import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    externalId!: number;

    @Column()
    title!: string;

    @Column()
    imgSrc!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    review!: number | null;

    @ManyToOne(() => User, user => user.products, { onDelete: 'CASCADE' })
    user!: User;
}
 