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
        
    } catch (error) {
        next(error)
    }
}