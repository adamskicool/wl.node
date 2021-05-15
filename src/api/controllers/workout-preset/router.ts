import {WorkoutPreset} from '../../../typeorm-models/WorkoutPreset';
import {getWorkoutPresetById, getWorkoutPresetByUserId} from './service';
import * as jwt from 'jsonwebtoken';
import {TokenData} from '../../types/token-data';
import {Workout} from '../../../typeorm-models/Workout';
import {startPresetWorkout} from '../workout/service';

const WorkoutPresetRouter = require('express').Router();

WorkoutPresetRouter.get('/user', async (req, res) => {
	const token: string = req.headers.token;
	const {userId}: TokenData = jwt.verify(token, process.env.JWT_SECRET);
	const presets: WorkoutPreset[] = await getWorkoutPresetByUserId(userId);
	return res.json(presets);
});

WorkoutPresetRouter.post('/start', async (req, res) => {
	const token: string = req.headers.token;
	const {userId}: TokenData = jwt.verify(token, process.env.JWT_SECRET);
	const presetId: string = req.body.presetId;
	const {id: workoutId}: Workout = await startPresetWorkout(userId, presetId);
	return res.json({workoutId});
});

module.exports = WorkoutPresetRouter;
