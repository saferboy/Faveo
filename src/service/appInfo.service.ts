import { AppInfo, } from "@model/appInfo.dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createAppInfo = async (info: AppInfo) => {
    return prisma.info.create({
        data: {
            name: info.name,
            location_geo: info.location_geo,
            location_address: info.location_address,
            phones: info.phones
        }
    })
}



export const allInfo = async () => {
    return prisma.info.findMany()
}

export const updateAppInfo = async (info: AppInfo, id: number) => {
    return prisma.info.update({
        data: {
            name: info.name,
            location_address: info.location_address,
            location_geo: info.location_geo,
            phones: info.phones
        },
        where: {
            id
        }
    })
}


