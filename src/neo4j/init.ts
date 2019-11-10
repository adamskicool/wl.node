import { IExercise } from './types/exercise-type';
import { createMuscleGroups } from './template-data';
import { create } from 'domain';
export function initDB(session: any) {
    resetDB(session)
    addTemplateData(session);
}

const resetDB = (session: any) => {
    session.run(`
        MATCH (n) DETACH DELETE n
    `)
}

const addTemplateData = (session: any) => {
    createMuscleGroups.forEach((group: string) => {
        session.run(group);
    })
}



// export const createExercises: string[] = exercises.map((exercise: IExercise) => {
//     return `MATCH (a: Exercise {name:"${exercise.name}"})-[r:WORKS]->(b: MuscleGroup {name:"${exercise.works[0]}"}))`
// })