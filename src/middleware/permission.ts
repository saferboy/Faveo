import { Request, Response, NextFunction } from "express";
import { verify } from "@service/jwt.service";

// export const permission = (role: boolean) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         const token = req.header("authorization")

//         // console.log(token)

//         if (!token) {
//             return res.status(401).json({
//                 message: "Token not provided",
//             });
//         }

//         try {

//             let payload = await verify(token);
//             console.log(payload.role)
//             console.log(role)

//             if (role) {
//                 if (payload.role !== "admin") {
//                     return res.status(401).json({
//                         message: "Acces Denied",
//                     });
//                 }
//             }


//             res.locals.payload = payload;
//             next();

//         } catch (error) {
//             next(error)
//             console.log(error);
//             return res.status(401).send({
//                 message: "invalid token",
//             });
//         }
//     }
// }



export default (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.header("authorization");

        console.log(token);

        if (!token) {
            return res.status(401).json({
                msg: "Token not provided",
            });
        }

        try {
            let payload = await verify(token);

            if (role) {
                if (payload.role !== "user") {
                    return res.status(401).json({
                        message: "Acces Denied",
                    });
                }
            }

            res.locals.payload = payload;
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).send({
                message: "invalid token",
            });
        }
    };
};
