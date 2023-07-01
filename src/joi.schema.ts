import joi from "joi";

export const forFindOrder = joi.object({
    id: joi.number().min(1).required()
}) 