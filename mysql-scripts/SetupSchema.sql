USE workout_logger_db;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

CREATE TABLE User (
	id VARCHAR(36) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE DEFAULT '',
    password VARCHAR(100) NOT NULL DEFAULT '',
	firstName VARCHAR(100) NOT NULL DEFAULT '',
    lastName VARCHAR(100) NOT NULL DEFAULT '',
    email VARCHAR(100) NOT NULL DEFAULT '',
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
    userId VARCHAR(36),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) DEFAULT '',
	muscleAreaId VARCHAR(36),
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES User (id),
    FOREIGN KEY (muscleAreaId) REFERENCES MuscleArea (id)
);

CREATE TABLE WorkoutPreset (
	id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE PresetExerciseSet (
	id VARCHAR(36) NOT NULL,
    nextPresetExerciseId VARCHAR(36), 
    presetId VARCHAR(36) NOT NULL,
    exerciseId VARCHAR(36) NOT NULL,
    reps INTEGER,
    weight INTEGER,
    time INTEGER,
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


-- Add triggers to automatically add uuid to the tables
CREATE TRIGGER add_user_uuid
  BEFORE INSERT 
  ON User FOR EACH ROW
    SET new.id = COALESCE(new.id, uuid());

CREATE TRIGGER add_musclearea_uuid
  BEFORE INSERT 
  ON MuscleArea FOR EACH ROW
    SET new.id = COALESCE(new.id, uuid());

CREATE TRIGGER add_exercise_uuid
  BEFORE INSERT 
  ON Exercise FOR EACH ROW
    SET new.id = COALESCE(new.id, uuid());

CREATE TRIGGER add_workout_preset_uuid
  BEFORE INSERT 
  ON WorkoutPreset FOR EACH ROW
    SET new.id = COALESCE(new.id, uuid());


CREATE TRIGGER add_preset_exercise_set_uuid
  BEFORE INSERT 
  ON PresetExerciseSet FOR EACH ROW
    SET new.id = COALESCE(new.id, uuid());

CREATE TRIGGER add_workout_uuid
  BEFORE INSERT 
  ON Workout FOR EACH ROW
    SET new.id = COALESCE(new.id, uuid());

CREATE TRIGGER add_workout_set_uuid
  BEFORE INSERT 
  ON WorkoutSet FOR EACH ROW
    SET new.id = COALESCE(new.id, uuid());



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

-- WorkoutPreset
SET @workout_preset_uuid = uuid();
INSERT INTO WorkoutPreset (id, name) VALUES (@workout_preset_uuid, 'Arm Workout');

-- PresetExerciseSet: add some Sets to the preset exercise
SET @preset_exercise_bicep_curl_uuid = uuid();
SET @preset_exercise_french_press_uuid = uuid();
INSERT INTO PresetExerciseSet (id, nextPresetExerciseId, presetId, exerciseId, reps, weight) VALUES (@preset_exercise_french_press_uuid, null, @workout_preset_uuid, @exercise_bicep_curl_uuid, 10, 35);
INSERT INTO PresetExerciseSet (id, nextPresetExerciseId, presetId, exerciseId, reps, weight) VALUES (@preset_exercise_bicep_curl_uuid, @preset_exercise_french_press_uuid, @workout_preset_uuid, @exercise_bicep_curl_uuid, 15, 20);
