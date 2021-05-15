import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {User} from './User';
import {MuscleArea} from './MuscleArea';
import {PresetExerciseSet} from './PresetExerciseSet';
import {WorkoutSet} from './WorkoutSet';

@Index('muscleAreaId', ['muscleAreaId'], {})
@Index('userId', ['userId'], {})
@Entity('Exercise', {schema: 'workout_logger_db'})
export class Exercise {
	@Column('varchar', {primary: true, name: 'id', length: 36})
	id: string;

	@Column('varchar', {name: 'userId', nullable: true, length: 36})
	userId: string | null;

	@Column('varchar', {name: 'name', length: 100})
	name: string;

	@Column('varchar', {name: 'type', nullable: true, length: 100})
	type: string | null;

	@Column('varchar', {name: 'muscleAreaId', nullable: true, length: 36})
	muscleAreaId: string | null;

	@ManyToOne(
		() => User,
		(user) => user.exercises,
		{
			onDelete: 'NO ACTION',
			onUpdate: 'NO ACTION',
		}
	)
	@JoinColumn([{name: 'userId', referencedColumnName: 'id'}])
	user: User;

	@ManyToOne(
		() => MuscleArea,
		(muscleArea) => muscleArea.exercises,
		{
			onDelete: 'NO ACTION',
			onUpdate: 'NO ACTION',
		}
	)
	@JoinColumn([{name: 'muscleAreaId', referencedColumnName: 'id'}])
	muscleArea: MuscleArea;

	@OneToMany(
		() => PresetExerciseSet,
		(presetExerciseSet) => presetExerciseSet.exercise
	)
	presetExerciseSets: PresetExerciseSet[];

	@OneToMany(
		() => WorkoutSet,
		(workoutSet) => workoutSet.exercise
	)
	workoutSets: WorkoutSet[];
}
