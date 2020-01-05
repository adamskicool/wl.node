require('dotenv').config();
import 'reflect-metadata';
import {createConnection} from 'typeorm';
const express = require('express');
const route = require('./api/route');

createConnection()
	.then(async (connection) => {
		const app = express();

		route(app);

		app.listen(process.env.API_PORT, () => {
			console.log(`Server is listening on port: ${process.env.API_PORT}`);
		});
	})
	.catch((error) => console.log(error));
