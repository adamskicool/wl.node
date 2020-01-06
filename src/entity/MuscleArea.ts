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
import {Exercise} from './Exercise';

@Entity('MuscleArea', {schema: 'workout_logger'})
export class MuscleArea {
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
		() => Exercise,
		(Exercise: Exercise) => Exercise.muscleArea,
		{onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
	)
	exercises: Exercise[];
}
