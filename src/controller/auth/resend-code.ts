import { Request, Response, NextFunction } from "express";
import { generateCode, getTimeOut } from "@utils/generateCode";
import { findUserByEmail, createVerification } from "@service/index";
import { VERIFICATION_TIMEOUT } from "@config/verification";
import { ResendDto } from "@model/resend.dto";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resend: ResendDto = req.body

        const user = await findUserByEmail(resend.email)

        if (user == null) {
            return res.status(404).json({
                message: 'User not found'
            })
        }


        const code: string = generateCode()

        const verification = await createVerification(code, user.email)

        if (verification == null) {
            return res.status(500).json({
                message: 'Cannot save verification'
            })
        }

        return res.status(201).json({
            message: "Verification code sended to email",
            email: user.email,
            verificationid: verification.id,
            timeOut: getTimeOut(verification.createdAt, VERIFICATION_TIMEOUT)
        })

    } catch (error) {
        next(error)
    }
}