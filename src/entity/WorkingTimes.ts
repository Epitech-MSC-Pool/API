import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {User} from './User';

@Entity()
export class WorkingTimes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Column({ type: "date" })
    start: Date;

    @Column()
    @Column({ type: "date" })
    end: Date;

    @ManyToOne(type => User)
    @JoinColumn()
    user: number;
}