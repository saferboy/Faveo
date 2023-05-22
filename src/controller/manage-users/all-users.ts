import { Request, Response, NextFunction } from "express";
import { allUser } from "@service/user.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const users = await allUser()

        const mapped = users.map(user => {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                surname:    user.surname,
                birthday:   user.birthday,
                phone: user.phone,
                role: user.role
            }
        })

        return res.status(201).json({
            message: 'Retrive all users',
            users: mapped
        })

    } catch (error) {
        next(error)
    }
}