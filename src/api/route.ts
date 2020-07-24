import {verifyJWTToken} from './middleware';

module.exports = (app) => {
	app.use(
		'/api/exercises',
		verifyJWTToken,
		require('./controllers/exercise/router')
	);
	app.use(
		'/api/muscleAreas',
		verifyJWTToken,
		require('./controllers/muscle-area/router')
	);
	app.use(
		'/api/workoutPresets',
		verifyJWTToken,
		require('./controllers/workout-preset/router')
	);
	app.use('/api/user', require('./controllers/user/router'));
};
