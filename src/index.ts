require('dotenv').config();
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import express = require('express');

createConnection()
	.then(async (connection) => {
		const app = express();

		app.get('/hello', (req, res) => {
			res.send('Hello world');
		});

		app.listen(process.env.API_PORT, () => {
			console.log(`Server is listening on port: ${process.env.API_PORT}`);
		});
	})
	.catch((error) => console.log(error));
