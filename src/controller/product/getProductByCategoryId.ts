import { Request, Response, NextFunction } from "express";
import { getProductByCategoryId } from "@service/product.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.category_id

        const find = await getProductByCategoryId(id)

        if (!find) {
            return res.status(404).json({
                message: `Product not found this Category ${id}`
            })
        }

        return res.status(201).json({
            message: `Retrive products by category id ${id}`,
            products: {
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