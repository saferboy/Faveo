import { Request, Response, NextFunction } from "express";
import { findProductByCategoryId } from "@service/product.service";

export default async (req: Request, res: Response, next: NextFunction) => {

    try {

        const category_id = +req.params.category_id

        const find = await findProductByCategoryId(category_id)

        if (!find) {
            return res.status(404).json({
                message: `Product not found this id" ${category_id}`
            })
        }


        return res.status(201).json({
            message: `Retrive product by category ${category_id}`,
            id: find.id,
            name: find.name,
            icon: find.icon,
            products: find.Product
        })

    } catch (error) {
        next(error)
    }

}