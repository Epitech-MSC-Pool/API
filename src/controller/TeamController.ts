import {json, Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
import {User} from "../entity/User";
import {Team} from '../entity/Team';
import {TeamRelation} from '../entity/TeamRelation';

class TeamController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const teamRepository = getRepository(Team);
        const teams = await teamRepository.find({});

        //Send the users object
        res.send(teams);
    };

    static getTeamsByID = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = Number(req.params.userID);
        //Get the clock from database
        const teamRepository = getRepository(Team);
        try {
            const teams = await teamRepository.find({
                where: {
                    id: id,
                },
            });
            res.status(200).send(teams)
        } catch (error) {
            res.status(404).send("Clock not found");
        }

    };

    static newTeam = async (req: Request, res: Response) => {
        //Get parameters from the body
        const userId: number = Number(req.params.userID);
        let {name} = req.body;
        let team = new Team();
        console.log(name);
        team.name=name;
        team.manager = 0;

        //Validade if the parameters are ok
        const errors = await validate(team);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save.
        console.log(team)
        const teamRepository = getRepository(Team);
        try {
            await teamRepository.save(team);
        } catch (e) {
            res.status(409).send("Name allready in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Team created");
    };

    static editTeam = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.teamID;

        //Get values from the body
        const { name,manager } = req.body;

        //Try to find user on database
        const teamRepository = getRepository(Team);
        let team;
        try {
            team = await teamRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Team not found");
            return;
        }

        //Validate the new values on model
        team.name = name;
        team.manager = Number(manager);
        const errors = await validate(team);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means username already in use
        try {
            await teamRepository.save(team);
        } catch (e) {
            res.status(409).send("Name already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteTeam = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.teamID;

        const teamRepository = getRepository(Team);
        const teamRelationRepository = getRepository(TeamRelation);
        let team: Team;
        try {
            team = await teamRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("Team not found");
            return;
        }
        teamRepository.delete(id);

        teamRelationRepository.delete({team: team.id});


        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static addUserToTeam = async (req: Request, res: Response) => {
        const id = req.params.id;
        const userId = req.params.userid;

        const teamRepository = getRepository(Team);
        const teamRelationRepository = getRepository(TeamRelation);
        let team;
        try {
            team = await teamRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Team not found");
            return;
        }

        let userTeam = new TeamRelation();
        userTeam.team = team.id;
        userTeam.user = Number(userId);

        const errors = await validate(userTeam);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means username already in use
        try {
            await teamRelationRepository.save(userTeam);
        } catch (e) {
            res.status(409).send("already in Team");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }

    static removeUserToTeam = async (req: Request, res: Response) => {
        const teamId = Number(req.params.id);
        const userId = Number(req.params.userid);

        const teamRelationRepository = getRepository(TeamRelation);

        let teamUser = new TeamRelation();
        try {
            teamUser = await teamRelationRepository.findOneOrFail({
                where: {
                    user: userId,
                    team: teamId
                },
                select: ["id","user","team"]
            });
        } catch (error) {
            res.status(404).send("User Team not found");
            return;
        }
        await teamRelationRepository.delete(teamUser.id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    }

    static getTeamByManager = async (req: Request, res: Response) => {
        const managerId = Number(req.params.managerId);

        const teamRepository = getRepository(Team);
        const teamRelationRepository = getRepository(TeamRelation);
        let team = await teamRepository.find({
                where: {
                    manager: managerId,
                }
            });
        console.log(team);
        //After all send a 204 (no content, but accepted) response
        res.status(200).send(team);

    }

    static getUserForOneTeam = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const teamRelationRepository = getRepository(TeamRelation);
        const userRepository = getRepository(User);
        let teams = await teamRelationRepository.find({
            where: {
                team: id,
            },
            select: ["id","user","team"]
        });
        let users = [];
        console.log("PROUTE");
        console.log(teams);
        for (const team of teams) {
            console.log(team);
            let user =  await userRepository.findOneOrFail(team.user, {
                select: ["id", "username","email","firstname","lastname"] //We dont want to send the password on response
            });
            console.log(user);
            users.push(user)
        };
        //After all send a 204 (no content, but accepted) response
        console.log("PROUTE2");
        res.status(200).send(users);

    }
}

export default TeamController;
