import { Request, Response, NextFunction } from "express";
import { allProducts } from "@service/product.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const options = await allProducts()

        const mapped = options.map(category => {
            return {
                id: category.id,
                name: category.name,
                price: category.price,
                image: category.image,
                category: {
                    id: category.category.id,
                    name: category.category.name,
                    icon: category.category.icon
                }
            }
        }) 

        return res.status(201).json({
            message: "Retrive all products",
            products: mapped
        })

    } catch (error) {
        next(error)
    }
}