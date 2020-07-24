import {Column, Entity, Index, JoinColumn, ManyToOne} from 'typeorm';
import {WorkoutPreset} from './WorkoutPreset';
import {Exercise} from './Exercise';

@Index('exerciseId', ['exerciseId'], {})
@Index('presetId', ['presetId'], {})
@Entity('PresetExerciseSet', {schema: 'workout_logger_db'})
export class PresetExerciseSet {
	@Column('varchar', {primary: true, name: 'id', length: 36})
	id: string;

	@Column('varchar', {
		name: 'nextPresetExerciseId',
		nullable: true,
		length: 36,
	})
	nextPresetExerciseId: string | null;

	@Column('varchar', {name: 'presetId', length: 36})
	presetId: string;

	@Column('varchar', {name: 'exerciseId', length: 36})
	exerciseId: string;

	@Column('int', {name: 'reps', nullable: true})
	reps: number | null;

	@Column('varchar', {name: 'weightGuide', nullable: true})
	weightGuide: string | null;

	@Column('int', {name: 'time', nullable: true})
	time: number | null;

	@ManyToOne(
		() => WorkoutPreset,
		(workoutPreset) => workoutPreset.presetExerciseSets,
		{onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
	)
	@JoinColumn([{name: 'presetId', referencedColumnName: 'id'}])
	preset: WorkoutPreset;

	@ManyToOne(
		() => Exercise,
		(exercise) => exercise.presetExerciseSets,
		{
			onDelete: 'NO ACTION',
			onUpdate: 'NO ACTION',
		}
	)
	@JoinColumn([{name: 'exerciseId', referencedColumnName: 'id'}])
	exercise: Exercise;
}
