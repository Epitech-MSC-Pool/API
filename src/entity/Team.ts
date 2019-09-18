import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
    OneToOne, JoinColumn, ManyToMany, ManyToOne
} from "typeorm";
import {Length, IsNotEmpty, IsEmail} from "class-validator";
import * as bcrypt from "bcryptjs";
import {User} from './User';

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    manager: number;


}
