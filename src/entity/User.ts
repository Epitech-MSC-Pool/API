import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn, ManyToMany
} from "typeorm";
import {Length, IsNotEmpty, IsEmail} from "class-validator";
import * as bcrypt from "bcryptjs";
import {Team} from './Team';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Length(4, 100)
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    @Length(4, 100)
    firstname: string;

    @Column()
    @Length(4, 100)
    lastname: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
