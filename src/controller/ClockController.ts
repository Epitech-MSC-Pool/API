import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
import {User} from "../entity/User";
import {Clocks} from '../entity/Clocks';

class ClockController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const clocksRepository = getRepository(Clocks);
        const clocks = await clocksRepository.find({

        });

        //Send the users object
        res.send(clocks);
    };

    static getClocksByUserID = async (req: Request, res: Response) => {
        //Get the ID from the url
        console.log("RPOUTE")
        const id: number = Number(req.params.userID);
        console.log(id)
        const userRepository = getRepository(User);
        const user = await userRepository.findOneOrFail(id, {
            select: ["id", "username", "role", "email"] //We dont want to send the password on response
        });
        //Get the clock from database
        const clocksRepository = getRepository(Clocks);
        try {
            const clock = await clocksRepository.findOneOrFail({
                where: {
                    user: user,
                },
            });
        } catch (error) {
            res.status(404).send("Clock not found");
        }
    };

    static newClock = async (req: Request, res: Response) => {
        //Get parameters from the body
        const userId: number = Number(req.params.userID);
        let {time, status} = req.body;
        let clock = new Clocks();
        const userRepository = getRepository(User);
        const user = await userRepository.findOneOrFail(userId, {
            select: ["id", "username", "role", "email"] //We dont want to send the password on response
        });
        clock.time = time;
        clock.status = status;

        //Validade if the parameters are ok
        const errors = await validate(clock);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save.
        const clocksRepository = getRepository(Clocks);
        try {
            await clocksRepository.save(clock);
        } catch (e) {
            res.status(409).send("already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Clock created");
    };
}

export default ClockController;