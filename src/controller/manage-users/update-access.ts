import { Request, Response, NextFunction } from "express";
import { findUserById, updateUserAccess } from "@service/user.service";
import { AccessDetail } from "@model/user.dto";

    export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const user: AccessDetail = req.body
        
        const olduser = await findUserById(id)
        
        if(!olduser) {
            return res.status(400).json({
                message: `There id no this ${id}`
            })
        }

        if (user == null) {
            return res.status(401).json({
                message: "Please complate all inputs"
            })
        }

        const updateUser = await updateUserAccess(id, user)

        return res.status(201).json({
            message: 'User access credentials updated',
            id: olduser.id,
            enail: olduser.email,
            name: olduser.name,
            surname: olduser.surname,
            birthday: olduser.birthday,
            phone: olduser.phone,
            role: updateUser.role
        })

    } catch (error) {
        next(error)
    }
}