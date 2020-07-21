/**
 * Service for login related database queries
 */

import {getRepository, Repository} from 'typeorm';
import {User} from '../../../entity/User';

const repository: Repository<User> = getRepository(User);

export const getUserByUsername = (username: string): Promise<User> => {
	return repository.findOne({where: {username}});
};

export const createUser = (
	username: string,
	passwordHash: string,
	email: string
): Promise<User> => {
	return repository.save({
		username,
		password: passwordHash,
		email
	});
};
