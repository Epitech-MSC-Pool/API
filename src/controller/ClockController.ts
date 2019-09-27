import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
import {User} from "../entity/User";
import {Clocks} from '../entity/Clocks';
import {WorkingTimes} from '../entity/WorkingTimes';

class ClockController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const clocksRepository = getRepository(Clocks);
        const clocks = await clocksRepository.find({});

        //Send the users object
        res.send(clocks);
    };

    static getClocksByUserID = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = Number(req.params.userID);
        //Get the clock from database
        const clocksRepository = getRepository(Clocks);
        try {
            const clock = await clocksRepository.find({
                where: {
                    user: id,
                },
            });
            res.status(200).send(clock)
        } catch (error) {
            res.status(404).send("Clock not found");
        }

    };

    static newClock = async (req: Request, res: Response) => {
        //Get parameters from the body
        console.log("PROUTE")
        const userId: number = Number(req.params.userID);
        let clock = new Clocks();
        clock.user = userId;
        clock.status = false;

        //Validade if the parameters are ok
        const errors = await validate(clock);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save.
        console.log(clock)
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

    static editClock = async (req: Request, res: Response) => {
        //Get parameters from the body
        const userId: number = Number(req.params.userID);
        let {time, status} = req.body;
        const clocksRepository = getRepository(Clocks);
        let clock;
        try {
            clock = await clocksRepository.findOneOrFail({
                where: {
                    user: userId,
                }
            });
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("clock not found");
            return;
        }
        console.log(clock, time, status)
        if (status) {
            clock.timeIn = time;
        } else {
            clock.timeOut = time;
        }
        clock.status = status;

        //Validade if the parameters are ok
        const errors = await validate(clock);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save.
        console.log(clock)
        try {
            await clocksRepository.save(clock);
        } catch (e) {
            res.status(409).send("already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send(clock);
    };

    static clockOut = async (req: Request, res: Response) => {
        //Get parameters from the body
        const userId: number = Number(req.params.userID);
        let {time, status} = req.body;
        const clocksRepository = getRepository(Clocks);
        let clock;
        try {
            clock = await clocksRepository.findOneOrFail({
                where: {
                    user: userId,
                }
            });
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Clock not found");
            return;
        }
        console.log(clock, time, status)
        if (status === "true") {
            clock.timeIn = time;
        } else {
            clock.timeOut = time;
        }
        clock.status = status;

        //Validade if the parameters are ok
        const errors = await validate(clock);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save.
        console.log(clock)
        try {
            await clocksRepository.save(clock);
        } catch (e) {
            res.status(409).send("already in use");
            return;
        }

        let workingTime = new WorkingTimes();
        workingTime.start = clock.timeIn;
        workingTime.end = clock.timeOut;
        workingTime.user = userId;

        //Validade if the parameters are ok
        const errors2 = await validate(workingTime);
        if (errors2.length > 0) {
            res.status(400).send(errors2);
            return;
        }

        //Try to save. If fails, the username is already in use
        const workingTimesRepository = getRepository(WorkingTimes);
        try {
            await workingTimesRepository.save(workingTime);
        } catch (e) {
            res.status(409).send("WorkingTime already in use");
            return;
        }
        //If all ok, send 201 response
        res.status(201).send({clock: clock, workingTime: workingTime});
    };
}

export default ClockController;
