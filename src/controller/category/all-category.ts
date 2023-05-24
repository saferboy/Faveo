import { Request, Response, NextFunction } from "express";
import { allCategory } from "@service/category.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const options = await allCategory()

        const mapped = options.map(option => {
            return {
                id: option.id,
                name: option.name,
                icon: option.icon
            }
        })

        return res.status(201).json({
            message: "Retrive all categories",
            catpgories: mapped
        })

    } catch (error) {
        next(error)
    }
}