import { Request, Response, NextFunction } from "express";
import { createProduct } from "@service/product.service";
import { ProductDto } from "@model/product.dto";
import { findCategoryById } from "@service/category.service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id
        const data: ProductDto = req.body

        const ctg = await findCategoryById(id)
        if (!ctg) {
            return res.status(404).json({
                message: `Category not found this ${id}`
            })
        }

        if (!req.file) {
            return res.status(401).json({
                message: "File not upload"
            })
        }

        const image = req.file.filename

        const newPrdct = await createProduct(id, data, image)


        return res.status(201).json({
            message: "Product created",
            product: {
                id: newPrdct.id,
                name: newPrdct.name,
                price: newPrdct.price,
                image: newPrdct.image,
                category: {
                    id: newPrdct.category.id,
                    name: newPrdct.category.name,
                    icon: newPrdct.category.icon
                }
            }
        })

    } catch (error) {
        next(error)
    }
} 