import { Request, Response, NextFunction } from "express";
import { SECRET_KEY, VERIFICATION_TIMEOUT } from "@config/verification";
import { VerificationDto } from "@model/verification.dto";
import { findUserByEmail, verifiedUser, findVerificationById } from "@service/index"
import { getTimeOut } from "@utils/generateCode";

import { Payload } from "@model/index";
import { sign } from "@service/jwt.service";
import bcrypt from "bcrypt";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const verify: VerificationDto = req.body
        const verified = await findVerificationById(verify.verificationId)

        if (verified == null) {
            return res.status(400).json({
                message: "verification id " + verify.verificationId + " not found"
            })
        }

        const timeOut = getTimeOut(verified.createdAt, VERIFICATION_TIMEOUT)

        if (timeOut < 0) {
            return res.status(404).json({
                message: "Verification code is expired, please resend code"
            })
        }

        if (verified.code != verify.code) {
            return res.status(400).json({
                message: 'Wrong verification code'
            })
        }

        const user = await findUserByEmail(verified.email)

        if (user == null) {
            return res.status(400).json({
                messsage: 'User not found'
            })
        }

        const payload: Payload = {
            userId: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            username: user.username,
            role: user.role
        }

        const token = await sign(payload)

        const updateUser = await verifiedUser(user.id, user.role)

        return res.status(201).json({
            message: 'Succesfully registered',
            user: {
                id: user.id,
                email: updateUser.email,
                name: updateUser.name,
                surname: updateUser.surname,
                birthday: updateUser.birthday,
                phone: updateUser.phone,
                role: updateUser.role
            },
            token: token
        })

    } catch (error) {
        next(error)
    }
}



// res.json({
//     userId,
//     name,
//     surname,
//     nickname,
//     role
// })