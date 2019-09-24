const Joi = require('@hapi/joi');

const registerValidation = data => {

    const schema = {

        // name: Joi.string()
        //     .min(6)
        //     .required(),
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required(), //regex(/^[a-zA-Z0-9]{3,30}$/)
    }
    // return Joi.validate(data, schema)

};

const loginValidation = data => {

    const schema = {

        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required(), //regex(/^[a-zA-Z0-9]{3,30}$/)
    }
    return Joi.validate(data, schema)

};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
