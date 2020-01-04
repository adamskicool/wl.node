import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Workout} from "./Workout";


@Entity("User" ,{schema:"workout_logger" } )
export class User {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"firstName"
        })
    firstName:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"lastName"
        })
    lastName:string;
        

    @Column("text",{ 
        nullable:true,
        name:"googleId"
        })
    googleId:string | null;
        

   
    @OneToMany(()=>Workout, (Workout: Workout)=>Workout.user,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    workouts:Workout[];
    
}
