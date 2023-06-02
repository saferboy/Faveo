import { Request, Response, NextFunction } from "express";
import { findProductById } from "@service/product.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const id = +req.params.id

        const find = await findProductById(id)

        if(!find) {
            return res.status(404).json({
                message: `Product not found this ${id}`
            })
        }

        return res.status(201).json({
            message: `Retrive product by id ${id}`,
            product: {
                id: find.id,
                name: find.name,
                price: find.price,
                image: find.image,
                category: {
                    id: find.category.id,
                    name: find.category.name,
                    icon: find.category.icon
                }
            }
        })

    } catch (error) {
        next(error)
    }
}