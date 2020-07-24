import * as jwt from 'jsonwebtoken';

export const signToken = async (userId: string): Promise<string> => {
	const token = await jwt.sign(
		{
			userId,
		},
		process.env.JWT_SECRET,
		{expiresIn: process.env.DEGUB ? '24h' : process.env.JWT_TOKEN_LIFETIME}
	);
	return token;
};
