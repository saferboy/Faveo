import { Request, Response, NextFunction } from "express";
import { createAppInfo, allInfo } from "@service/appInfo.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let info = await allInfo();
        console.log(info)

        if (info.length) {
            const mapped = info.map(inf => {
                return {
                    name: inf.name,
                    location_geo: inf.location_geo,
                    location_address: inf.location_address,
                    phones: inf.phones
                }
            })

            return res.status(201).json({
                message: "Application info retrived",
                info: mapped
            });
        }

        if (!info.length) {
            const newInfo = await createAppInfo({
                name: "",
                location_geo: "",
                location_address: "",
                phones: ""
            });

            const detail = {
                name: newInfo.name,
                location: {
                    geo: newInfo.location_geo,
                    address: newInfo.location_geo
                },
                phones: newInfo.phones
            };

            return res.status(201).json({
                message: 'Application info retrieved',
                info: detail
            });
        }
    } catch (error) {
        next(error);
    }
};
