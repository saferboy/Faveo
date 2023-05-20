import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email
        }
    })
} 

export const findUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: {
            id
        }
    })
}