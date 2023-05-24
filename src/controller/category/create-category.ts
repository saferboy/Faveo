import { Request, Response, NextFunction } from "express";
import { createCategory, findCategoryByname } from "@service/category.service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const name = req.body.name

        const category = await findCategoryByname(name)

        if (category) {
            return res.status(404).json({
                message: `Category with this ${name} has already been created`
            })
        }

        if(!req.file) {
            return res.status(400).json({
                message: "File not upload"
            })
        }

        const file = req.file.filename

        const newCtg = await createCategory(name, file)

        return res.status(201).json({
            message: 'Category created',
            category: {
                id: newCtg.id,
                name: newCtg.name,
                icon: newCtg.icon
            }
        })
        
    } catch (error) {
        next(error)
    }
}
