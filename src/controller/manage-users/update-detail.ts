import { Request, Response, NextFunction } from "express";
import { findUserById, updateUserDetails } from "@service/user.service";
import { UserDetail } from '@model/user.dto'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id
        const user: UserDetail = req.body
        const oldUser = await findUserById(id)

        if (!oldUser) {
            return res.status(404).json({
                message: `User not found this: ${id}`
            })
        }

        const newUser = await updateUserDetails(user, id)

        return res.status(201).json({
            message: 'User info updated',
            id: newUser.id,
            email: oldUser.email,
            name: newUser.name,
            surname: newUser.surname,
            birthday: newUser.birthday,
            phone: newUser.phone,
            role: newUser.role
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}