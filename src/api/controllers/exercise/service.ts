/**
 * Service for exercise related database queries
 */

import {getRepository, Repository} from 'typeorm';
import {Exercise} from '../../../entity/Exercise';

const repository: Repository<Exercise> = getRepository(Exercise);

export const getAllExercises = async (): Promise<Exercise[]> => {
	return repository.find();
};

export const getExerciseById = async (uuid: string): Promise<Exercise> => {
	return repository.findOne({where: {id: uuid}});
};

export const getExerciseByMuscleArea = async (
	uuid: string
): Promise<Exercise[]> => {
	return repository.find({where: {muscleAreaId: uuid}});
};
