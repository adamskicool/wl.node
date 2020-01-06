/**
 * Express router for exercise related requests
 */

const ExerciseRouter = require('express').Router();
import {getAllExercises, getExerciseById} from './service';
import {Exercise} from '../../../entity/Exercise';

ExerciseRouter.get('/all', async (_, res) => {
	const exercises: Exercise[] = await getAllExercises();
	console.log(exercises);
	return res.json(exercises);
});

ExerciseRouter.get('/:id', async (req, res) => {
	const id: string = req.params.id;
	const exercise: Exercise = await getExerciseById(id);
	console.log(exercise);
	return res.json(exercise);
});

module.exports = ExerciseRouter;
