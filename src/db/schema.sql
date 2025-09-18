BEGIN TRANSACTION;

DROP TABLE IF EXISTS teams CASCADE;

DROP TABLE IF EXISTS games;

DROP TABLE IF EXISTS scoreboards;


CREATE TABLE
    teams (
        id SERIAL PRIMARY KEY,
        team_id INT,
        school TEXT,
        mascot TEXT,
        abbreviation TEXT,
        conference TEXT,
        division TEXT,
        classification TEXT,
        color TEXT,
        alternate_color TEXT,
        logos TEXT [],
        home_location_id INT
    );

CREATE TABLE
    games (
        id SERIAL PRIMARY KEY,
        game_id INT,
        season INT,
        season_week INT,
        season_type TEXT,
        start_date DATE,
        completed BOOLEAN,
        neutral_site BOOLEAN,
        conference_game BOOLEAN,
        home_team_id INT NOT NULL,
        home_points INT NOT NULL,
        home_qtr_scores INT [],
        away_team_id INT NOT NULL,
        away_points INT NOT NULL,
        away_qtr_scores INT []
    );

CREATE TABLE scoreboards (
    game_id INT PRIMARY KEY,
    start_date DATE,
    start_time_tbd BOOLEAN,
    tv TEXT,
    neutral_site BOOLEAN,
    game_status TEXT,
    game_period TEXT,
    clock TEXT,
    situation TEXT,
    possesion TEXT,
    last_play TEXT,
    venue TEXT [],
    home_team TEXT [],
    away_team TEXT [],
    weather TEXT [],
    betting TEXT []
);
--     CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(50) UNIQUE NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL, 
--     favorite_team REFERENCES teams(id) ON DELETE SET NULL,
-- );


-- CREATE TABLE favorites (
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     team_id INT REFERENCES teams(id) ON DELETE CASCADE,
--     PRIMARY KEY (user_id, team_id)
-- );
COMMIT;