import {getRepository, Repository} from 'typeorm';
import { Workout } from "../../../entity/Workout";
import { WorkoutPreset } from '../../../entity/WorkoutPreset';

const repository: Repository<Workout> = getRepository(Workout);
const repositoryPreset: Repository<WorkoutPreset> = getRepository(WorkoutPreset);

export const startPresetWorkout = async (
    userId: string,
    presetId: string,
    name: string = undefined
): Promise<Workout> => {
    const preset: WorkoutPreset = await repositoryPreset.findOne({where: { id: presetId }})
	return repository.save({userId, presetId, name: name || preset.name})
};