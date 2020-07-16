/**
 * Express router for exercise related requests
 */
const ExerciseRouter = require('express').Router();
import {
	getAllPublicExercises,
	getExerciseById,
	getExerciseByMuscleArea,
	createExercise
} from './service';
import {Exercise} from '../../../entity/Exercise';
import {ICreateExercise} from './type';
import {verifyCreateExercise} from './middleware';

ExerciseRouter.get('/public', async (_, res) => {
	const exercises: Exercise[] = await getAllPublicExercises();
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

ExerciseRouter.post('', verifyCreateExercise, async (req, res) => {
	const exercise: Exercise = await createExercise(req.body);
	return res.json(exercise);
});

module.exports = ExerciseRouter;
