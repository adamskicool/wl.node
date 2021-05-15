import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Workout } from "./Workout";
import { Exercise } from "./Exercise";

@Index("exerciseId", ["exerciseId"], {})
@Index("workoutId", ["workoutId"], {})
@Entity("WorkoutSet", { schema: "workout_logger_db" })
export class WorkoutSet {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "workoutId", length: 36 })
  workoutId: string;

  @Column("varchar", { name: "exerciseId", length: 36 })
  exerciseId: string;

  @Column("int", { name: "weight", default: () => "'0'" })
  weight: number;

  @Column("int", { name: "time", default: () => "'0'" })
  time: number;

  @Column("int", { name: "repetitions", default: () => "'0'" })
  repetitions: number;

  @Column("timestamp", {
    name: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  timestamp: Date | null;

  @ManyToOne(() => Workout, (workout) => workout.workoutSets, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "workoutId", referencedColumnName: "id" }])
  workout: Workout;

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutSets, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "exerciseId", referencedColumnName: "id" }])
  exercise: Exercise;
}
