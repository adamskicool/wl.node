const Joi = require('@hapi/joi');

const createExerciseSchema: any = Joi.object({
	name: Joi.string().required(),
	type: Joi.string(),
	muscleAreaId: Joi.string().required()
});

export const verifyCreateExercise = (req, res, next) => {
	const body: any = req.body;
	const {result, error}: any = createExerciseSchema.validate(body);
	error ? res.json(error.details.map((detail) => detail.message)) : next();
};
