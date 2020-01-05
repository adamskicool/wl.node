module.exports = (app) => {
	app.use('/api/exercise', require('./controllers/exercise/router'));
};
