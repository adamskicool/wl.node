import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { WorkoutPreset } from "./WorkoutPreset";
import { WorkoutSet } from "./WorkoutSet";

@Index("presetId", ["presetId"], {})
@Index("userId", ["userId"], {})
@Entity("Workout", { schema: "workout_logger_db" })
export class Workout {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("varchar", { name: "userId", length: 36 })
  userId: string;

  @Column("varchar", { name: "presetId", length: 36 })
  presetId: string;

  @Column("timestamp", {
    name: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  timestamp: Date | null;

  @ManyToOne(() => User, (user) => user.workouts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => WorkoutPreset, (workoutPreset) => workoutPreset.workouts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "presetId", referencedColumnName: "id" }])
  preset: WorkoutPreset;

  @OneToMany(() => WorkoutSet, (workoutSet) => workoutSet.workout)
  workoutSets: WorkoutSet[];
}
