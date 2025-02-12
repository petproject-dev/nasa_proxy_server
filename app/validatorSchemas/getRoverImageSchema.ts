import Joi from "joi";

const getRoverImageSchema = Joi.object({
	api_key: Joi.string().required().messages({
		"string.base": "api_key should be a string",
		"any.required": "api_key is required",
	}),
});

export default getRoverImageSchema;
