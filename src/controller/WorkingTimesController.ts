import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";

import {User} from "../entity/User";
import {WorkingTimes} from '../entity/WorkingTimes';

class WorkingTimesController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const id: number = Number(req.params.userID);
        const start: string = req.params.start;
        const end: string = req.params.end;
        console.log(id, start, end)
        const workingTimesRepository = getRepository(WorkingTimes);
        const workingTimes = await workingTimesRepository.find({
            where: {
                userID: id,
                start: start,
                end: end
            }
        });
        //Send the users object
        res.send(workingTimes);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const userID: number = Number(req.params.userID);
        const workingtimeID: number = Number(req.params.workingtimeID);

        //Get the user from database
        let workingTimes
        try {
            const workingTimesRepository = getRepository(WorkingTimes);
            workingTimes = await workingTimesRepository.find({
                where: {
                    userID: userID,
                    id: workingtimeID
                }
            });
        } catch (error) {
            res.status(404).send("User not found");
        }
        res.status(200).send(workingTimes)
    };

    static newWorkingTime = async (req: Request, res: Response) => {
        //Get parameters from the body
        const userID: number = Number(req.params.userID);
        let {start, end} = req.body;
        let workingTime = new WorkingTimes();
        workingTime.start = start;
        workingTime.end = end
        workingTime.user = userID;

        //Validade if the parameters are ok
        const errors = await validate(workingTime);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the username is already in use
        const workingTimesRepository = getRepository(WorkingTimes);
        try {
            await workingTimesRepository.save(workingTime);
        } catch (e) {
            res.status(409).send("username already in use");
            return;
        }
        //If all ok, send 201 response
        res.status(201).send("User created");
    };

    static editWorkingTime = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        let {start, end, userID} = req.body;

        //Try to find user on database
        const workingTimesRepository = getRepository(WorkingTimes);
        let workingTime;
        try {
            workingTime = await workingTimesRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("workingTime not found");
            return;
        }

        //Validate the new values on model
        workingTime.start = start;
        workingTime.end = end;
        const errors = await validate(workingTime);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means username already in use
        try {
            await workingTimesRepository.save(workingTime);
        } catch (e) {
            res.status(409).send("username already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteWorkingTime = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const workingTimesRepository = getRepository(WorkingTimes);
        let workingTime: WorkingTimes;
        try {
            workingTime = await workingTimesRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        workingTimesRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
};

export default WorkingTimesController;