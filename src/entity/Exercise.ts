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
import {MuscleArea} from './MuscleArea';
import {WorkoutSet} from './WorkoutSet';
import {WorkoutPreset} from './WorkoutPreset';

@Entity('Exercise', {schema: 'workout_logger'})
@Index('muscleAreaId', ['muscleArea'])
export class Exercise {
	@PrimaryGeneratedColumn({
		type: 'int',
		name: 'id'
	})
	id: number;

	@Column('varchar', {
		nullable: false,
		length: 100,
		name: 'name'
	})
	name: string;

	@Column('varchar', {
		nullable: true,
		length: 100,
		name: 'type'
	})
	type: string | null;

	@ManyToOne(
		() => MuscleArea,
		(MuscleArea: MuscleArea) => MuscleArea.exercises,
		{onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
	)
	@JoinColumn({name: 'muscleAreaId'})
	muscleArea: MuscleArea | null;

	@OneToMany(
		() => WorkoutSet,
		(WorkoutSet: WorkoutSet) => WorkoutSet.exercise,
		{onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
	)
	workoutSets: WorkoutSet[];

	@ManyToMany(
		() => WorkoutPreset,
		(WorkoutPreset: WorkoutPreset) => WorkoutPreset.exercises,
		{nullable: false}
	)
	@JoinTable({name: 'PresetExercise'})
	workoutPresets: WorkoutPreset[];
}
