import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";

class UserController{

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ["id", "username", "role","email","firstname","lastname"] //We dont want to send the passwords on response
        });

        //Send the users object
        res.send(users);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        console.log("print"+ req.params.userID)
        const id: number = Number(req.params.userID);

        //Get the user from database
        const userRepository = getRepository(User);
        let user:User = new User();
        try {
             user = await userRepository.findOneOrFail(id, {
                select: ["id", "username", "role","email","firstname","lastname"] //We dont want to send the password on response
            });
        } catch (error) {
            res.status(404).send("User not found");
        }
        res.status(200).send(user)
    };

    static getOneByEmail = async (req: Request, res: Response) => {
        //Get the email & username from the url
        const email: string = (req.params.email);
        const username: string = (req.params.username);
        console.log(email,username)
        let user:User = new User();
        //Get the user from database
        const userRepository = getRepository(User);
        try {
             user = await userRepository.findOneOrFail({
                where: {
                    email: email,
                    username: username
                },
                select: ["id", "username", "role","email","firstname","lastname"] //We dont want to send the password on response
            });
        } catch (error) {
            res.status(404).send("User not found");
        }
        res.status(200).send(user)
    };

    static newUser = async (req: Request, res: Response) => {
        //Get parameters from the body
        console.log("TEST")
        let {password,email,firstname,lastname,username } = req.body;
        let user = new User();
        user.lastname = lastname;
        user.password = password;
        user.role = "USER";
        user.email = email;
        user.firstname = firstname;
        user.username = username;
        console.log(user)
        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();

        //Try to save. If fails, the username is already in use
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("username already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send(user);
    };

    static editUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.userID;

        //Get values from the body
        const { username, role,email,firstname,lastname} = req.body;

        //Try to find user on database
        const userRepository = getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("User not found");
            return;
        }

        //Validate the new values on model
        user.username = username;
        user.email = email;
        user.role = role;
        user.firstname = firstname;
        user.lastname = lastname;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means username already in use
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("username already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.userID;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        userRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
};

export default UserController;
