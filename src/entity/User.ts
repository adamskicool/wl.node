import {Column, Entity, Index, OneToMany} from 'typeorm';
import {Exercise} from './Exercise';
import {Workout} from './Workout';
import {WorkoutPreset} from './WorkoutPreset';

@Index('username', ['username'], {unique: true})
@Entity('User', {schema: 'workout_logger_db'})
export class User {
	@Column('varchar', {primary: true, name: 'id', length: 36})
	id: string;

	@Column('varchar', {name: 'username', unique: true, length: 100})
	username: string;

	@Column('varchar', {name: 'password', length: 100})
	password: string;

	@Column('varchar', {name: 'firstName', length: 100})
	firstName: string;

	@Column('varchar', {name: 'lastName', length: 100})
	lastName: string;

	@Column('varchar', {name: 'email', length: 100})
	email: string;

	@Column('text', {name: 'googleId', nullable: true})
	googleId: string | null;

	@OneToMany(
		() => Exercise,
		(exercise) => exercise.user
	)
	exercises: Exercise[];

	@OneToMany(
		() => Workout,
		(workout) => workout.user
	)
	workouts: Workout[];

	@OneToMany(
		() => WorkoutPreset,
		(workoutPreset) => workoutPreset.user
	)
	workoutPresets: WorkoutPreset[];
}
