import { Request, Response, NextFunction } from "express";
import { updaCategory, findCategoryById } from "@service/category.service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const id = +req.params.id
        const name = req.body.name

        if(!req.file) {
            return res.status(404).json({
                message: "File not upload"
            })
        }

        const oldCtg = await findCategoryById(id)
        if(!oldCtg) {
            return res.status(400).json({
                message: `Category not found this: ${id}`
            })
        }

        const icon = req.file.filename

        const newCtg = await updaCategory(id, name, icon)
        
        return res.status(201).json({
            message: "Category updated",
            category: {
                id: newCtg?.id,
                name: newCtg?.name,
                icon: newCtg?.icon
            }
        })

    } catch (error) {
        next(error)
    }
}