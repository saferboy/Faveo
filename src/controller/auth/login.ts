import { Request, Response, NextFunction } from "express";
import { findUserByEmail } from "@service/user.service";
import { LoginDto } from "@model/index"
    
import { Payload } from "@model/index";
import { sign } from "@service/jwt.service";
import bcrypt from "bcrypt";


export default async (req: Request, res: Response, next: NextFunction) => {

    try {

        const login: LoginDto = req.body
        const user = await findUserByEmail(login.email)

        if (user == null) {
            return res.status(404).json({
                message: `User with email ${login.email} not found`
            })
        }

        if (user.role == "none") {
            return res.status(400).json({
                message: 'Account not verified, please verify account'
            })
        }


        if (bcrypt.compareSync(login.password, user.password)) {
            const payload: Payload = {
                userId: user.id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                username: user.username,
                role: user.role
            };

            const token = await sign(payload)

            return res.status(200).json({
                message: "Succesfuly login",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.id,
                    surname: user.surname,
                    birthday: user.birthday,
                    phone: user.phone,
                    role: user.role
                },
                token: token
            })
        } 

    } catch (error) {
        next(error)
    }

}