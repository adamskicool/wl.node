USE workout_logger_db;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

CREATE TABLE User (
	id VARCHAR(36) DEFAULT (uuid()),
    username VARCHAR(100) NOT NULL UNIQUE DEFAULT '',
    password VARCHAR(100) NOT NULL DEFAULT '',
	firstName VARCHAR(100) NOT NULL DEFAULT '',
    lastName VARCHAR(100) NOT NULL DEFAULT '',
    email VARCHAR(100) NOT NULL DEFAULT '',
	googleId TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE MuscleArea (
	id VARCHAR(36) DEFAULT (uuid()),
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE Exercise (
	id VARCHAR(36) DEFAULT (uuid()),
    userId VARCHAR(36),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) DEFAULT '',
	muscleAreaId VARCHAR(36),
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES User (id),
    FOREIGN KEY (muscleAreaId) REFERENCES MuscleArea (id)
);

CREATE TABLE WorkoutPreset (
	id VARCHAR(36) DEFAULT (uuid()),
    userId VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (userId) REFERENCES User (id),
    PRIMARY KEY (id)
);

CREATE TABLE PresetExerciseSet (
	id VARCHAR(36) DEFAULT (uuid()),
    nextPresetExerciseId VARCHAR(36), 
    presetId VARCHAR(36) NOT NULL,
    exerciseId VARCHAR(36) NOT NULL,
    reps INTEGER,
    weightGuide VARCHAR(100),
    time INTEGER,
    FOREIGN KEY (presetId) REFERENCES WorkoutPreset (id),
    FOREIGN KEY (exerciseId) REFERENCES Exercise (id),
    PRIMARY KEY (id)
);

CREATE TABLE Workout (
	id VARCHAR(36) DEFAULT (uuid()),
    name TEXT NOT NULL,
	userId VARCHAR(36) NOT NULL,
    presetId VARCHAR(36) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES User (id),
    FOREIGN KEY (presetId) REFERENCES WorkoutPreset (id)
);

CREATE TABLE WorkoutSet (
	id VARCHAR(36) DEFAULT (uuid()),
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



-- INITIAL: Add starter data.


-- User: username: root, password: password
SET @user_uuid = uuid();
INSERT INTO User (id, username, password, firstName, lastName, email) VALUES (@user_uuid, 'root', '$2a$10$lhuTEIkerGThcLLk3.HZY.wvU0xFKMZaFvmSvJ83d.Y4vs9hSN28e', 'Workout', 'Logger', 'workout.logger@gmail.com');

-- MuscleArea: add muscle area.
SET @muscle_area_bicep_uuid = uuid();
SET @muscle_area_tricep_uuid = uuid();
INSERT INTO MuscleArea (id, name) VALUES (@muscle_area_bicep_uuid, 'Bicep');
INSERT INTO MuscleArea (id, name) VALUES (@muscle_area_tricep_uuid, 'Tricep');

-- Exercsise: add some exercises to the user
SET @exercise_bicep_curl_uuid = uuid();
SET @exercise_french_press_uuid = uuid();
INSERT INTO Exercise (id, userId, name, muscleAreaId) VALUES (@exercise_bicep_curl_uuid, @user_uuid, 'Bicep Curl (sitting)', @muscle_area_bicep_uuid);
INSERT INTO Exercise (id, userId, name, muscleAreaId) VALUES (@exercise_french_press_uuid, @user_uuid, 'French Press', @muscle_area_tricep_uuid);

-- WorkoutPreset: add a workout preset
SET @workout_preset_uuid = uuid();
SET @workout_preset_2_uuid = uuid();
INSERT INTO WorkoutPreset (id, userId, name, description) VALUES (@workout_preset_uuid, @user_uuid, 'Arm Workout', 'Intense arm workout focusing on both bicep and tricep with a staggering two whole exerises with one set each, hold on... this is about to get stinking sweaty.');
INSERT INTO WorkoutPreset (id, userId, name, description) VALUES (@workout_preset_2_uuid, @user_uuid, 'Leg workout', 'This workout will not be very good, since it does not contain any sets, but you can take a lap around the house of something...');

-- PresetExerciseSet: add some Sets to the workout preset
SET @preset_exercise_french_press_uuid = uuid();
SET @preset_exercise_french_press_uuid2 = uuid();
SET @preset_exercise_french_press_uuid3 = uuid();
SET @preset_exercise_french_press_uuid4 = uuid();
SET @preset_exercise_bicep_curl_uuid = uuid();
SET @preset_exercise_bicep_curl_uuid2 = uuid();
SET @preset_exercise_bicep_curl_uuid3 = uuid();
SET @preset_exercise_bicep_curl_uuid4 = uuid();

INSERT INTO PresetExerciseSet (id, nextPresetExerciseId, presetId, exerciseId, reps, weightGuide) VALUES (@preset_exercise_french_press_uuid, @preset_exercise_french_press_uuid2, @workout_preset_uuid, @exercise_french_press_uuid, 15, 'start');
INSERT INTO PresetExerciseSet (id, nextPresetExerciseId, presetId, exerciseId, reps, weightGuide) VALUES (@preset_exercise_french_press_uuid2, @preset_exercise_french_press_uuid3, @workout_preset_uuid, @exercise_french_press_uuid, 12, 'increase');
INSERT INTO PresetExerciseSet (id, nextPresetExerciseId, presetId, exerciseId, reps, weightGuide) VALUES (@preset_exercise_french_press_uuid3, @preset_exercise_french_press_uuid4, @workout_preset_uuid, @exercise_french_press_uuid, 10, 'increase');
INSERT INTO PresetExerciseSet (id, nextPresetExerciseId, presetId, exerciseId, reps, weightGuide) VALUES (@preset_exercise_french_press_uuid4, @preset_exercise_bicep_curl_uuid, @workout_preset_uuid, @exercise_french_press_uuid, 6, 'increase');
INSERT INTO PresetExerciseSet (id, nextPresetExerciseId, presetId, exerciseId, reps, weightGuide) VALUES (@preset_exercise_bicep_curl_uuid, @preset_exercise_bicep_curl_uuid2, @workout_preset_uuid, @exercise_bicep_curl_uuid, 20, 'start');
INSERT INTO PresetExerciseSet (id, nextPresetExerciseId, presetId, exerciseId, reps, weightGuide) VALUES (@preset_exercise_bicep_curl_uuid2, @preset_exercise_bicep_curl_uuid3, @workout_preset_uuid, @exercise_bicep_curl_uuid, 12, 'increase');
INSERT INTO PresetExerciseSet (id, nextPresetExerciseId, presetId, exerciseId, reps, weightGuide) VALUES (@preset_exercise_bicep_curl_uuid3, @preset_exercise_bicep_curl_uuid4, @workout_preset_uuid, @exercise_bicep_curl_uuid, 10, 'increase');
INSERT INTO PresetExerciseSet (id, nextPresetExerciseId, presetId, exerciseId, reps, weightGuide) VALUES (@preset_exercise_bicep_curl_uuid4, null, @workout_preset_uuid, @exercise_bicep_curl_uuid, 6, 'increase');
