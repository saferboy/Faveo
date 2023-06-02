import { Request, Response, NextFunction } from "express";
import { findCategoryById } from "@service/category.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const id = +req.params.id

        const category = await findCategoryById(id)

        if(!category) {
            return res.status(404).json({
                message: `Category not found this ${id}`
            })
        }

        return res.status(201).json({
            message: 'Retrive category',
            category: {
                id: category.id,
                name: category.name,
                icon:   category.icon,
            }
        })

    } catch (error) {
        next(error)
    }
}