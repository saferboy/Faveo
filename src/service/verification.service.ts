import { PrismaClient } from "@prisma/client";
import { Verification } from "@model/verification.dto";
import { v4 as uuid } from "uuid"

const prisma = new PrismaClient()

export const createVerification = async (code: string, email: string) => {
    const id = uuid()

    const result = await prisma.verification.create({
        data: {
            id,
            code,
            email
        }
    });

    return result

    // if (!result) {
    //     return null
    // }

    // const createdAt: Date = new Date(result.createdAt);

    // return new Verification(id, code, email, createdAt);
}


export const findVerificationById = async (id: string) => {
    const result = await prisma.verification.findUnique({
        where: {
            id,
        },
    });

    if (!result) {
        return null;
    }

    const { code, email, createdAt } = result;

    return new Verification(id, code, email, new Date(createdAt));
};


export const findVerificationByEmail = async (email: string) => {
    const result = await prisma.verification.findFirst({
        where: {
            email,
        },
    });

    if (!result) {
        return null;
    }

    const { id, code, createdAt } = result;

    return new Verification(id, code, email, new Date(createdAt));
};


export const cleanVerification = async (timeOut: number) => {
    const time = new Date().getTime() - timeOut * 1000;

    return prisma.verification.deleteMany({
        where: {
            createdAt: {
                lt: new Date(time),
            },
        },
    });

};
