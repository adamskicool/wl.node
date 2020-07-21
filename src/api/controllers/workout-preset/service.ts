import {getRepository, Repository} from 'typeorm';
import {WorkoutPreset} from '../../../entity/WorkoutPreset';

const repository: Repository<WorkoutPreset> = getRepository(WorkoutPreset);

export const getWorkoutPresetById = (id: string): Promise<WorkoutPreset> => {
	return repository.findOne({where: {id}});
};

export const getWorkoutPresetByUserId = (
	userId: string
): Promise<WorkoutPreset[]> => {
	return repository.find({where: {userId}, relations: ['presetExerciseSets']});
};
