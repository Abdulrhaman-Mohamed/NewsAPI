const joi = require('joi');

const loginSchema = joi.object({
    Email: joi.string().email().required().messages({
        "any.required": "email is required",
        "string.email": "email must be as 'Example@gmail.com'"
    }),
    Password: joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).messages({
        // "string.base": "Password should be have one uppercase, lowercase , Special characters at least and Minimum Length At least 8 characters long",
        "string.pattern.base": "Password should be have one uppercase, lowercase , Special characters at least and Minimum Length At least 8 characters long",
        "any.required": "password is required"
    }).required()
});


//Register Schema Validation
const registerSchema = joi.object({
    FullName: joi.string().min(3).max(20).messages({
        "string.base": "firstName must be String",
        "any.required": "firstName is required",
        "string.min": "firstName must be at least 3 characters long",
        "string.max": "firstName must be at most 20 characters long"
    }).required(),
    Email: joi.string().email().messages({
        "any.required": "email is required",
        "string.email": "email must be as 'Example@gmail.com'"
    }).required(),
    Password: joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).messages({
        "string.pattern.base": "Password should be have one uppercase, lowercase , Special characters at least and Minimum Length At least 8 characters long",
        "any.required": "password is required"
    }).required()
})


module.exports = {
    loginSchema,
    registerSchema
}