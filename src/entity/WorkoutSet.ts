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

@Entity('WorkoutSet', {schema: 'workout_logger'})
@Index('workoutId', ['workout'])
@Index('exerciseId', ['exercise'])
export class WorkoutSet {
	@Column('varchar', {
		nullable: false,
		primary: true,
		length: 36,
		name: 'id'
	})
	id: string;

	@Column('varchar', {
		nullable: false,
		length: 36,
		name: 'workoutId'
	})
	workoutId: string;

	@ManyToOne(
		() => Workout,
		(Workout: Workout) => Workout.workoutSets,
		{nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
	)
	@JoinColumn({name: 'workoutId'})
	workout: Workout | null;

	@Column('varchar', {
		nullable: false,
		length: 36,
		name: 'exerciseId'
	})
	exerciseId: string;

	@ManyToOne(
		() => Exercise,
		(Exercise: Exercise) => Exercise.workoutSets,
		{nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
	)
	@JoinColumn({name: 'exerciseId'})
	exercise: Exercise | null;

	@Column('int', {
		nullable: false,
		default: () => "'0'",
		name: 'weight'
	})
	weight: number;

	@Column('int', {
		nullable: false,
		default: () => "'0'",
		name: 'time'
	})
	time: number;

	@Column('int', {
		nullable: false,
		default: () => "'0'",
		name: 'repetitions'
	})
	repetitions: number;

	@Column('timestamp', {
		nullable: true,
		default: () => 'CURRENT_TIMESTAMP',
		name: 'timestamp'
	})
	timestamp: Date | null;
}
