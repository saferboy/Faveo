import { Request, Response, NextFunction } from "express";
import { removeUser, findUserById } from "@service/user.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id
        const user = await findUserById(id)

        if (!user) {
            return res.status(404).json({
                message: `User not found this ${id}`
            })
        }

        const remove = await removeUser(id)

        return res.status(200).json({
            message: `User with id: ${id} deleted`,
            id: remove.id,
            email: remove.email,
            name: remove.name,
            surname: remove.surname,
            birthday: remove.birthday,
            phone: remove.phone,
            role: remove.role
        })

    } catch (error) {
        next(error)
    }
}