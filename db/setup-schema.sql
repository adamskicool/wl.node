CREATE TABLE User (
	id VARCHAR(36) NOT NULL,
	firstName VARCHAR(100) NOT NULL DEFAULT '',
    lastName VARCHAR(100) NOT NULL DEFAULT '',
	googleId TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE MuscleArea (
	id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Exercise (
	id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) DEFAULT '',
	muscleAreaId VARCHAR(36) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (muscleAreaId) REFERENCES MuscleArea (id)
);

CREATE TABLE WorkoutPreset (
	id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE PresetExercise (
	presetId VARCHAR(36) NOT NULL,
    exerciseId VARCHAR(36) NOT NULL,
    FOREIGN KEY (presetId) REFERENCES WorkoutPreset (id),
    FOREIGN KEY (exerciseId) REFERENCES Exercise (id)
);

CREATE TABLE Workout (
	id VARCHAR(36) NOT NULL,
    name TEXT NOT NULL,
	userId VARCHAR(36) NOT NULL,
    presetId VARCHAR(36) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES User (id),
    FOREIGN KEY (presetId) REFERENCES WorkoutPreset (id)
);

CREATE TABLE WorkoutSet (
	id VARCHAR(36) NOT NULL,
    workoutId VARCHAR(36) NOT NULL,
    exerciseId VARCHAR(36) NOT NULL,
    weight INTEGER NOT NULL DEFAULT 0,
    time INTEGER NOT NULL DEFAULT 0,
    repetitions INTEGER NOT NULL DEFAULT 0,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (workoutId) REFERENCES Workout (id),
    FOREIGN KEY (exerciseId) REFERENCES Exercise (id)
);
