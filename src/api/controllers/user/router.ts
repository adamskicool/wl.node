const UserRouter = require('express').Router();
import {verifyLogin, verifySignup} from './middleware';
import {getUserByUsername, createUser} from './service';
import {User} from '../../../typeorm-models/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {IError} from '../type';
import {ESQLError} from '../enum';
import {signToken} from './helper';

const SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS);

UserRouter.post('/login', verifyLogin, async (req, res) => {
	const user: User = await getUserByUsername(req.body.username);
	if (!user) {
		res.status(500).json({message: 'No such user'} as IError);
		return;
	}
	const match = await bcrypt.compare(req.body.password, user.password);
	if (!match) {
		res.status(500).json({message: 'No such user'} as IError);
		return;
	}
	const token = await signToken(user.id);
	res.status(200).json({token, username: user.username});
});

UserRouter.post('/signup', verifySignup, async (req, res) => {
	const passwordHash: string = await bcrypt.hash(
		req.body.password,
		SALT_ROUNDS
	);
	try {
		const user: User = await createUser(
			req.body.username,
			passwordHash,
			req.body.email
		);
		const token = await signToken(user.id);
		res.status(200).json({token, username: user.username});
	} catch (error) {
		if (error.code === ESQLError.ER_DUP_ENTRY) {
			res.status(500).json({message: 'Username taken'} as IError);
		} else {
			res.status(500).json({message: 'Failed to create user'} as IError);
		}
	}
});

module.exports = UserRouter;
