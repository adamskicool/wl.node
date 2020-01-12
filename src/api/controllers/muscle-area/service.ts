/**
 * Service for muscle area related database queries
 */

import {getRepository, Repository} from 'typeorm';
import {MuscleArea} from '../../../entity/MuscleArea';

const repository: Repository<MuscleArea> = getRepository(MuscleArea);

export const getAllMuscleAreas = (): Promise<MuscleArea[]> => {
	return repository.find();
};

export const getMuscleAreaById = (id: string): Promise<MuscleArea> => {
	return repository.findOne({where: {id}});
};
