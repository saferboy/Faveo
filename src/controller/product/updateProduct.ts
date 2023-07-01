import { Request, Response, NextFunction } from "express";
import { updateProduct, findProductById } from "@service/product.service";
import { CreateProductInput } from "@model/product.dto";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id
        const prdctbody: CreateProductInput = req.body

        const find = await findProductById(id)


        if (!find) {
            return res.status(404).json({
                message: `Product not found this id: ${id}`
            })
        }

        if (!req.file) {
            return res.status(404).json({
                message: "File not upload"
            })
        }
        const image = req.file.filename

        const newProduct = await updateProduct(id, prdctbody, image)

        return res.status(201).json({
            message: 'Product updated',
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price,
            image: newProduct.image,
            category: {
                id: newProduct.category.id,
                name: newProduct.category.name,
                icon: newProduct.category.icon
            }
        })

    } catch (error) {
        next(error)
    }
}