/**
 * Service for exercise related database queries
 */

import {getRepository, Repository} from 'typeorm';
import {Exercise} from '../../../entity/Exercise';

const exerciseRepository: Repository<Exercise> = getRepository(Exercise);

export const getAllExercises = async (): Promise<Exercise[]> => {
	return exerciseRepository.find();
};

export const getExerciseById = async (uuid: string): Promise<Exercise> => {
	return exerciseRepository.findOne({where: {id: uuid}});
};
