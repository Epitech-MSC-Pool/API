import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
    OneToOne, JoinColumn
} from "typeorm";
import {Length, IsNotEmpty, IsEmail} from "class-validator";
import * as bcrypt from "bcryptjs";
import {User} from './User';

@Entity()
export class Clocks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    time: Date;

    @Column()
    @IsNotEmpty()
    status: boolean = false;

    @OneToOne(type => User)
    @JoinColumn()
    user: number;


}
