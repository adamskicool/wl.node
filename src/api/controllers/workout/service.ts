import {getRepository, Repository} from 'typeorm';
import {Workout} from '../../../typeorm-models/Workout';
import {WorkoutPreset} from '../../../typeorm-models/WorkoutPreset';

const repository: Repository<Workout> = getRepository(Workout);
const repositoryPreset: Repository<WorkoutPreset> = getRepository(
	WorkoutPreset
);

export const startPresetWorkout = async (
	userId: string,
	presetId: string,
	name: string = undefined
): Promise<Workout> => {
	const preset: WorkoutPreset = await repositoryPreset.findOne({
		where: {id: presetId},
	});
	return repository.save({userId, presetId, name: name || preset.name});
};
