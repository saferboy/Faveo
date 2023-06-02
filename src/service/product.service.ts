import { PrismaClient } from "@prisma/client";
import { ProductDto } from "@model/product.dto";
import * as fsRegular from 'node:fs';

const prisma = new PrismaClient()

export const createProduct = async (ctgId: number, product: ProductDto, image: string) => {
    return prisma.product.create({
        data: {
            name: product.name,
            price: product.price,
            image: image,
            categoryId: ctgId
        },
        include: {
            category: true,
        }
    })
}

export const allProducts = async () => {
    return prisma.product.findMany({
        include: {
            category: true
        }
    })
}


export const getProductByCategoryId = async (category_id: number) => {
    return prisma.product.findUnique({
        where: {
            id: category_id
        },
        include: {
            category: true
        }
    })
}


export const findProductById = async (id: number) => {
    return prisma.product.findUnique({
        where: {
            id
        },
        include: {
            category: true
        }
    })
}

export const updateProduct = async (id: number, product: ProductDto, image: string) => {
    return prisma.product.update({
        data: {
            name: product.name,
            price: product.price,
            image
        },
        where: {
            id
        },
        include: {
            category: true
        }
    })
}


export const removeProduct = async (id: number) => {
    const result = await prisma.product.delete({
        where: {
            id
        }
    })

    fsRegular.rm(result.image, (error) => {
        console.log(`Category's icon deleted`)
    })
    return result
}

