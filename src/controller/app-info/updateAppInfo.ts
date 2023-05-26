import { Request, Response, NextFunction } from "express";
import { createAppInfo, allInfo, updateAppInfo } from "@service/appInfo.service";
import { AppInfo } from "@model/appInfo.dto";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data: AppInfo = req.body

        const id = +req.params.id

        let info = await allInfo()

        if (!info.length) {
            let info = await createAppInfo({
                name: data.name,
                location_address: data.location_address,
                location_geo: data.location_geo,
                phones: data.phones
            })
            return info
        }

       

        let newInfo = await updateAppInfo(data, id)


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



    } catch (error) {
        next(error)
    }
}