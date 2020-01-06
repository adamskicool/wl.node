import {
	BaseEntity,
	Column,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	RelationId
} from 'typeorm';
import {Workout} from './Workout';
import {Exercise} from './Exercise';

@Entity('WorkoutPreset', {schema: 'workout_logger'})
export class WorkoutPreset {
	@Column('varchar', {
		nullable: false,
		primary: true,
		length: 36,
		name: 'id'
	})
	id: string;

	@Column('varchar', {
		nullable: false,
		length: 100,
		name: 'name'
	})
	name: string;

	@OneToMany(
		() => Workout,
		(Workout: Workout) => Workout.preset,
		{onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
	)
	workouts: Workout[];

	@ManyToMany(
		() => Exercise,
		(Exercise: Exercise) => Exercise.workoutPresets,
		{nullable: false}
	)
	@JoinTable({name: 'PresetExercise'})
	exercises: Exercise[];
}
