import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { PresetExerciseSet } from "./PresetExerciseSet";
import { Workout } from "./Workout";
import { User } from "./User";

@Index("userId", ["userId"], {})
@Entity("WorkoutPreset", { schema: "workout_logger_db" })
export class WorkoutPreset {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "userId", length: 36 })
  userId: string;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @OneToMany(
    () => PresetExerciseSet,
    (presetExerciseSet) => presetExerciseSet.preset
  )
  presetExerciseSets: PresetExerciseSet[];

  @OneToMany(() => Workout, (workout) => workout.preset)
  workouts: Workout[];

  @ManyToOne(() => User, (user) => user.workoutPresets, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
