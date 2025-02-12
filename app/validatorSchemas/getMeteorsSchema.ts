import Joi from "joi";

const getMeteorsSchema = Joi.object({
	date: Joi.alternatives().try(
		Joi.array().items(
			Joi.string().isoDate().required().messages({
				"date.base": "The date must be a valid ISO date format (YYYY-MM-DD).",
				"any.required": "The date parameter is required.",
			}),
		),
		Joi.string().isoDate().required().messages({
			"date.base": "The date must be a valid ISO date format (YYYY-MM-DD).",
			"any.required": "The date parameter is required.",
		}),
	),

	count: Joi.string().valid("true", "false").optional().messages({
		"string.base": "count must be a string.",
		"any.only": 'count must be either "true" or "false".',
	}),

	"were-dangerous-meteors": Joi.string()
		.valid("true", "false")
		.optional()
		.messages({
			"string.base": "were-dangerous-meteors must be a string.",
			"any.only": 'were-dangerous-meteors must be either "true" or "false".',
		}),
});

export default getMeteorsSchema;
