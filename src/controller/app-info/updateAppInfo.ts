import { Request, Response, NextFunction } from "express";
import { createAppInfo, allInfo, updateAppInfo } from "@service/appInfo.service";
import { AppInfo } from "@model/appInfo.dto";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data: AppInfo = req.body

        const id = +req.params.id

        let info = await allInfo()

        if (!info) {
            let info = await createAppInfo({
                name: "",
                location_address: "",
                location_geo: "",
                phones: ""
            })

            const detail = {
                name: info.name,
                location: {
                    geo: info.location_geo,
                    address: info.location_geo
                },
                phones: info.phones
            };

            return res.status(201).json({
                message: 'Application info retrieved',
                info: detail
            });
        }

        if (info) {

            let newInfo = await updateAppInfo(data, info.id)

            return res.status(201).json({
                message: 'App info updated',
                info: {
                    id: newInfo.id,
                    name: newInfo.name,
                    location: {
                        geo: newInfo.location_geo,
                        address: newInfo.location_address,
                        phones: newInfo.phones
                    },
                }
            })
        }





    } catch (error) {
        next(error)
    }
}