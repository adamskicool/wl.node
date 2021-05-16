/**
 * Express router for exercise related requests
 */
const ExerciseRouter = require('express').Router();
import {
	getAllPublicExercises,
	getExerciseById,
	getExerciseByMuscleArea,
	createExercise,
	getAllUserExercises,
} from './service';
import {Exercise} from '../../../typeorm-models/Exercise';
import {ICreateExercise} from './type';
import {verifyCreateExercise} from './middleware';
import * as jwt from 'jsonwebtoken';
import {TokenData} from '../../types/token-data';

ExerciseRouter.get('/public', async (_, res) => {
	const exercises: Exercise[] = await getAllPublicExercises();
	return res.json(exercises);
});

ExerciseRouter.get('/user', async (req, res) => {
	const token: string = req.headers.token;
	const {userId}: TokenData = jwt.verify(token, process.env.JWT_SECRET);
	const exercises: Exercise[] = await getAllUserExercises(userId);
	return res.json(exercises);
});

// ExerciseRouter.get('/:id', async (req, res) => {
// 	const id: string = req.params.id;
// 	const exercise: Exercise = await getExerciseById(id);
// 	return res.json(exercise);
// });

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
