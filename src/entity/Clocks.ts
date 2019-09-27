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
export class Clocks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Column({
        type: "date",
        nullable:true })
    timeIn: Date;

    @Column()
    @Column({
        type: "date",
        nullable:true
    })
    timeOut: Date;

    @Column()
    status: boolean = false;

    @Column()
    @ManyToOne(type => User)
    @JoinColumn()
    user: number;

}
