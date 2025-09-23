
BEGIN TRANSACTION;
DROP TABLE IF EXISTS user_bets CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS users CASCADE;
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
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
    );
CREATE TABLE user_bets (
    id SERIAL PRIMARY KEY,
    user_id INT,
    game_id INT,
    amount INT,
    betting JSON,
    time_stamp TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP),
  UNIQUE (user_id, game_id),
    CONSTRAINT fk_user_id
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_game_id
        FOREIGN KEY(game_id)
        REFERENCES games(id)
    );
