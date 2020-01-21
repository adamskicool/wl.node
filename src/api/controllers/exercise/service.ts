/**
 * Service for exercise related database queries
 */

import {getRepository, Repository} from 'typeorm';
import {Exercise} from '../../../entity/Exercise';
import {v4 as uuid} from 'uuid';

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

export const createExercise = async (payload: Partial<Exercise>) => {
	return repository.save({...payload, id: uuid()});
};
