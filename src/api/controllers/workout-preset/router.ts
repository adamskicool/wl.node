import {WorkoutPreset} from '../../../entity/WorkoutPreset';

import {getWorkoutPresetById, getWorkoutPresetByUserId} from './service';
const WorkoutPresetRouter = require('express').Router();

WorkoutPresetRouter.get('/:id', async (req, res) => {
	const id: string = req.params.id;
	const preset: WorkoutPreset = await getWorkoutPresetById(id);
	return res.json(preset);
});

WorkoutPresetRouter.get('/user/:id', async (req, res) => {
	const id: string = req.params.id;
	const presets: WorkoutPreset[] = await getWorkoutPresetByUserId(id);
	return res.json(presets);
});

module.exports = WorkoutPresetRouter;
