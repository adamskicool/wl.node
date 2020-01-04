import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Exercise} from "./Exercise";


@Entity("MuscleArea" ,{schema:"workout_logger" } )
export class MuscleArea {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"name"
        })
    name:string;
        

   
    @OneToMany(()=>Exercise, (Exercise: Exercise)=>Exercise.muscleArea,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    exercises:Exercise[];
    
}
