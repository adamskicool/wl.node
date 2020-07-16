import {Column, Entity, OneToMany} from 'typeorm';
import {Workout} from './Workout';
import {Exercise} from './Exercise';

@Entity('User', {schema: 'workout_logger'})
export class User {
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
		name: 'username',
		unique: false
	})
	username: string;

	@Column('varchar', {
		nullable: false,
		length: 100,
		name: 'password'
	})
	password: string;

	@Column('varchar', {
		nullable: false,
		length: 100,
		name: 'firstName'
	})
	firstName: string;

	@Column('varchar', {
		nullable: false,
		length: 100,
		name: 'email'
	})
	email: string;

	@Column('text', {
		nullable: true,
		name: 'googleId'
	})
	googleId: string | null;

	@OneToMany(
		() => Workout,
		(Workout: Workout) => Workout.user,
		{onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
	)
	workouts: Workout[];

	@OneToMany(
		() => Exercise,
		(Exercise: Exercise) => Exercise.user,
		{onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
	)
	exercises: Exercise[];
}
