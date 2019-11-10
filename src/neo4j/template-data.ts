const muscleGroups: string[] = [
    'Biceps',
    'Triceps',
    'Forearms',
    'Front Shoulder',
    'Side Shoulder',
    'Back Shoulder',
    'Trapetius',
    'Scapula',
    'Latusimus',
    'Lower Back',
    'Pectorial Major',
    'Pectorial Minor',
    'Upper Abs',
    'Middle Abs',
    'Lower Abs',
    'Glutes',
    'Hamstrings',
    'Thighs',
    'Calves'
]

export const createMuscleGroups: string[] = muscleGroups.map((group: string) => {
    return `CREATE (n: MuscleGroup {name:"${group}"})`
})