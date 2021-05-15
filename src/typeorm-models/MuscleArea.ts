import { Column, Entity, OneToMany } from "typeorm";
import { Exercise } from "./Exercise";

@Entity("MuscleArea", { schema: "workout_logger_db" })
export class MuscleArea {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @OneToMany(() => Exercise, (exercise) => exercise.muscleArea)
  exercises: Exercise[];
}
