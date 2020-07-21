import {WorkoutPreset} from '../../../entity/WorkoutPreset';
import {getWorkoutPresetById, getWorkoutPresetByUserId} from './service';
import * as jwt from 'jsonwebtoken';

const WorkoutPresetRouter = require('express').Router();

WorkoutPresetRouter.get('/user', async (req, res) => {
	const token: string = req.headers.token;
	const dehashed: any = jwt.verify(token, process.env.JWT_SECRET);
	const presets: WorkoutPreset[] = await getWorkoutPresetByUserId(
		dehashed.userId
	);
	return res.json(presets);
});

module.exports = WorkoutPresetRouter;
