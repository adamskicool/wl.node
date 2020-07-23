import {WorkoutPreset} from '../../../entity/WorkoutPreset';
import {getWorkoutPresetById, getWorkoutPresetByUserId} from './service';
import * as jwt from 'jsonwebtoken';
import {TokenData} from '../../types/token-data';

const WorkoutPresetRouter = require('express').Router();

WorkoutPresetRouter.get('/user', async (req, res) => {
	const token: string = req.headers.token;
	const {userId}: TokenData = jwt.verify(token, process.env.JWT_SECRET);
	const presets: WorkoutPreset[] = await getWorkoutPresetByUserId(userId);
	return res.json(presets);
});

module.exports = WorkoutPresetRouter;
