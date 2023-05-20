import { Request, Response, NextFunction } from "express";
import { findVerificationById } from "@service/verification.service";
import { getTimeOut } from "@utils/generateCode";
import { VERIFICATION_TIMEOUT } from "@config/verification";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const verificationId = String(req.query.id)
        const verification = await findVerificationById(verificationId)

        if (verification == null) {
            return res.status(400).json({
                message: 'Cannot find verification'
            })
        }

        const timeOut = getTimeOut(verification.createdAt, VERIFICATION_TIMEOUT)

        if (timeOut > 0) {
            return res.status(200).json({
                message: 'Verificarion code sended to email',
                email: verification.email,
                timeOut
            })
        } else {
            return res.status(400).json({
                message: "verification code is expired, please resend code",
                verificationId: verification.id
            })
        }

    } catch (error) {
        next(error)
    }
}