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
import {ICreateExercise} from './type';
import {verifyCreateExercise} from './middleware';

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

ExerciseRouter.post('', verifyCreateExercise, async (req, res) => {
	// const exercise: ICreateExercise = req.body;
	// console.log(exercise);
	res.json({helloWorld: 'hello there world fucker!'});
});

module.exports = ExerciseRouter;
