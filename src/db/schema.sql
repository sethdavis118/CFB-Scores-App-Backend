BEGIN;

DROP TABLE IF EXISTS user_bets CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS teams CASCADE;


CREATE TABLE teams (
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



CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    favorite_team INT REFERENCES teams(id) ON DELETE SET NULL,
    favorite_conference TEXT,
    bets INT[]
);


CREATE TABLE games (
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
    home_qtr_scores INT[],
    away_team_id INT NOT NULL,
    away_points INT NOT NULL,
    away_qtr_scores INT[]

);


CREATE TABLE user_bets (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    game_id INT REFERENCES games(id),
    amount INT,
    betting JSON,
    time_stamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, game_id)
);

COMMIT;


TRUNCATE user_bets, teams, games, users RESTART IDENTITY CASCADE;