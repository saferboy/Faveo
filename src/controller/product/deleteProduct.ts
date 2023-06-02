import { Request, Response, NextFunction } from "express";
import { removeProduct, findProductById } from '@service/product.service'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const find = await findProductById(id)

        if (!find) {
            return res.status(404).json({
                message: `Product not found this id: ${id} or alredy deleted`
            })
        }

        const removed = await removeProduct(id)

        return res.status(201).json({
            message: 'Product deleted',
            product: {
                id: removed.id,
                name: removed.name,
                price: removed.price,
                image: removed.image,
                category_id: removed.categoryId
            }
        })

    } catch (error) {
        next(error)
    }
}