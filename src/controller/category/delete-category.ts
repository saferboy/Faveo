import { Request, Response, NextFunction } from "express";
import { removeCategory, findCategoryById } from "@service/category.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const findCtg = await findCategoryById(id)
        if(!findCtg) {
            return res.status(404).json({
                message: `Category not found this id:${id} or alredy deleted`
            })
        }

        const removed = await removeCategory(id)

        return res.status(200).json({
            message: "Category deleted",
            category: {
                id: removed.id,
                name: removed.name,
                icon:   removed.icon
            }
        })

        

    } catch (error) {
        next(error)
    }
}