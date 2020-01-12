/**
 * Express router for muscle area related requests
 */
import {getAllMuscleAreas, getMuscleAreaById} from './service';
import {MuscleArea} from '../../../entity/MuscleArea';

const MuscleAreaRouter = require('express').Router();

MuscleAreaRouter.get('/all', async (_, res) => {
	const muscleAreas: MuscleArea[] = await getAllMuscleAreas();
	return res.json(muscleAreas);
});

MuscleAreaRouter.get('/:id', async (req, res) => {
	const id: string = req.params.id;
	const muscleArea: MuscleArea = await getMuscleAreaById(id);
	return res.json(muscleArea);
});

module.exports = MuscleAreaRouter;
