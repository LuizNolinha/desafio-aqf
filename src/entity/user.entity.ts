import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from './product.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({ unique: true })
    password!: string;

    @OneToMany(() => Product, product => product.user)
    products!: Product[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async validatePassword(rawPassword: string): Promise<boolean> {
        return bcrypt.compare(rawPassword, this.password);
    }

}
 