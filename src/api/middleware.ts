import * as jwt from 'jsonwebtoken';
import {IError} from './controllers/type';

export const verifyJWTToken = async (req, res, next) => {
	if (process.env.DEBUG) {
		next();
		return;
	}
	const token: string = req.headers.token;
	if (!token) {
		res.status(500).json({message: 'Invalid JWT token'} as IError);
		return;
	}
	jwt.verify(token, process.env.JWT_SECRET, function(error, decoded) {
		if (error) {
			res.status(500).json({message: 'Invalid JWT token'} as IError);
			return;
		}
		next();
	});
};
