/**
 * Express router for exercise related requests
 */

const ExerciseRouter = require('express').Router();
import {
	getAllExercises,
	getExerciseById,
	getExerciseByMuscleArea
} from './service';
import {Exercise} from '../../../entity/Exercise';

ExerciseRouter.get('/all', async (_, res) => {
	const exercises: Exercise[] = await getAllExercises();
	return res.json(exercises);
});

ExerciseRouter.get('/:id', async (req, res) => {
	const id: string = req.params.id;
	const exercise: Exercise = await getExerciseById(id);
	return res.json(exercise);
});

ExerciseRouter.get('/muscleArea/:id', async (req, res) => {
	const id: string = req.params.id;
	const exercises: Exercise[] = await getExerciseByMuscleArea(id);
	return res.json(exercises);
});

module.exports = ExerciseRouter;
