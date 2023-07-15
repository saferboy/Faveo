import { Request, Response, NextFunction } from "express";
import { createAppInfo, allInfo } from "@service/appInfo.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let info = await allInfo();
        console.log(info)

        if (info) {
            const mapped = {
                id: info.id,
                name: info.name,
                location_geo: info.location_geo,
                location_address: info.location_address,
                phones: info.phones

            }

            return res.status(201).json({
                message: "Application info retrived",
                info: mapped
            });
        }

        if (!info) {
            const newInfo = await createAppInfo({
                name: "",
                location_geo: "",
                location_address: "",
                phones: ""
            });

            const detail = {
                id: newInfo.id,
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
