import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {User} from "./User";
import {WorkoutPreset} from "./WorkoutPreset";
import {WorkoutSet} from "./WorkoutSet";


@Entity("Workout" ,{schema:"workout_logger" } )
@Index("userId",["user",])
@Index("presetId",["preset",])
export class Workout {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("text",{ 
        nullable:false,
        name:"name"
        })
    name:string;
        

   
    @ManyToOne(()=>User, (User: User)=>User.workouts,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'userId'})
    user:User | null;


   
    @ManyToOne(()=>WorkoutPreset, (WorkoutPreset: WorkoutPreset)=>WorkoutPreset.workouts,{ onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'presetId'})
    preset:WorkoutPreset | null;


    @Column("timestamp",{ 
        nullable:true,
        default: () => "CURRENT_TIMESTAMP",
        name:"timestamp"
        })
    timestamp:Date | null;
        

   
    @OneToMany(()=>WorkoutSet, (WorkoutSet: WorkoutSet)=>WorkoutSet.workout,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    workoutSets:WorkoutSet[];
    
}
