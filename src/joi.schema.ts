import joi from "joi";

export const forFindOrder = joi.object({
    id: joi.number().min(1).required()
}) 

export const updateStatus = joi.object({
    id: joi.number().min(1).required(),
    status: joi.string().min(1).required()
})