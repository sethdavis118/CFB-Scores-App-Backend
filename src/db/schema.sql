
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
        logos JSON,
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
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(50) NOT NULL,
    favorite_team INT REFERENCES teams(id) ON DELETE SET NULL,
    favorite_conference TEXT,
    bets INT [],
    active BOOLEAN DEFAULT true
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

TRUNCATE user_bets, teams, games, users RESTART IDENTITY CASCADE;
