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
import {Team} from './Team';

@Entity()
export class TeamRelation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ManyToOne(type => User)
    @JoinColumn()
    user: number;

    @Column()
    @ManyToOne(type => Team)
    @JoinColumn()
    team: number;

}
