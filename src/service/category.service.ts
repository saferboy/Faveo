import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createCategory = async (name: string, icon: string) => {
    return prisma.categroy.create({
        data: {
            name,
            icon
        }
    })
}


export const findCategoryByname = async (name: string) => {
    return prisma.categroy.findFirst({
        where: {
            name
        }
    })
}


export const findCategoryById = async (id: number) => {
    return prisma.categroy.findUnique({
        where: {
            id
        }
    })
}


export const allCategory = async () => {
    return prisma.categroy.findMany()
}

