import { asyncHandler } from "../utils/asyncHandler.js";


export const joi = (schema) => async (req, res, next) => {
    console.log(req.body)
    const data = await schema.validate(req.body);
    if (data.error) {
        return res.status(400).json({
            "message": data.error.message
        })
    }
    next()
}