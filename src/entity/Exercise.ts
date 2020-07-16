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
import { User } from './User';

@Entity('Exercise', {schema: 'workout_logger'})
@Index('muscleAreaId', ['muscleArea'])
export class Exercise {
	@Column('varchar', {
		nullable: false,
		primary: true,
		length: 36,
		name: 'id'
	})
	id: string;

	@Column('varchar', {
		nullable: true,
		length: 36,
		name: 'userId'
	})
	userId: string;

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

	@Column('varchar', {
		nullable: false,
		length: 36,
		name: 'muscleAreaId'
	})
	muscleAreaId: string;

	@ManyToOne(
		() => MuscleArea,
		(MuscleArea: MuscleArea) => MuscleArea.exercises,
		{nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
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
		(WorkoutPreset: WorkoutPreset) => WorkoutPreset.exercises
	)
	workoutPresets: WorkoutPreset[];

	@ManyToOne(
		() => User,
		(User: User) => User.exercises,
		{nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
	)
	@JoinColumn({name: 'userId'})
	user: User | null;
}
