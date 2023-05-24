import { PrismaClient } from "@prisma/client";

import * as fsPromises from 'node:fs/promises';
import * as fsRegular from 'node:fs';

const prisma = new PrismaClient()

export const createCategory = async (name: string, icon: string) => {
    return prisma.category.create({
        data: {
            name,
            icon
        }
    })
}


export const findCategoryByname = async (name: string) => {
    return prisma.category.findFirst({
        where: {
            name
        }
    })
}


export const findCategoryById = async (id: number) => {
    return prisma.category.findUnique({
        where: {
            id
        }
    })
}


export const allCategory = async () => {
    return prisma.category.findMany()
}


export const removeCategory = async (id: number) => {
    const result = await prisma.category.delete({
        where: {
            id
        }
    })

    fsRegular.rm(result.icon, (error) => {
        console.log(`Category's icon deleted`)
    })
    return result
}



// // export const updaCategory = async (id: number, name: string, icon: string) => {
// //     return prisma.category.update({
// //         where: {
// //             id
// //         },
// //         data: {
// //             name,
// //             icon
// //         }
// //     })
// // }



export const updateCategoryWithFile = async (id: number, name: string, iconFilePath: string) => {
    try {
        const oldCategory = await prisma.category.findUnique({
            where: {
                id
            },
        });

        if (oldCategory) {
            const oldIconFilePath = `path/to/directory/${oldCategory.icon}`;
            await fsPromises.unlink(oldIconFilePath);
        }

        const newIconFileName = `new_icon_${Date.now()}.png`;
        const newIconFilePath = `path/to/directory/${newIconFileName}`;

        await fsPromises.copyFile(iconFilePath, newIconFilePath);

        const updatedCategory = await prisma.category.update({
            where: {
                id,
            },
            data: {
                name,
                icon: newIconFileName,
            },
        });

        return updatedCategory;
    } catch (error) {
        console.error(error);
    }
};


