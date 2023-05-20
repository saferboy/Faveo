import { Request, Response, NextFunction } from "express";
import { getTimeOut, generateCode } from "@utils/generateCode";

import { UserDto } from "@model/user.dto";
import { VERIFICATION_TIMEOUT } from "@config/verification"
import { cleanVerification, createUser, createVerification, excistUser, sendEmail } from "@service/index";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data: UserDto = req.body

        const isExcist: boolean = await excistUser(data.email)

        if (isExcist) {
            return res.status(403).json({
                message: 'Email alredy busy'
            })
        }

        const newUser = await createUser(data)

        const code: string = generateCode()

        await sendEmail(newUser.email, code)

        const verification = await createVerification(code, newUser.email)

        if (verification == null) {
            return res.status(500).json({
                message: "Can't save verification"
            })
        }

        const deleteCount = await cleanVerification(VERIFICATION_TIMEOUT)
        console.log('Deleted verification', deleteCount)

        res.status(200).json({
            message:        'Verification code sended to email',
            email:          newUser.email,
            verificationId: verification.id,
            timeOut:        getTimeOut(verification.createdAt, VERIFICATION_TIMEOUT)
        })

    } catch (error) {
        next(error)
    }
}