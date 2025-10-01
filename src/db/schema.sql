BEGIN;
DROP TABLE IF EXISTS user_bets CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS leaderboard CASCADE;


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
    bets INT[],
    credits INT DEFAULT 500,
    last_reset DATE DEFAULT CURRENT_DATE
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
    homeTeam TEXT,
    homeConference TEXT,
    home_team_id INT NOT NULL,
    home_points INT,
    home_qtr_scores INT[],
    awayTeam TEXT,
    awayConference TEXT,
    away_team_id INT NOT NULL,
    away_points INT,
    away_qtr_scores INT[]
);
CREATE TABLE user_bets (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    game_id INT, -- Had to remove the reference here. It would be nice to fix that eventually. - Seth
    team_id INT, 
    favored_team INT, 
    amount INT,
    odds TEXT,
    win_status BOOLEAN,
    time_stamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    week INT DEFAULT 1,
    UNIQUE (user_id, game_id)
);

CREATE TABLE leaderboard (
    id SERIAL PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ,
    username VARCHAR(100) UNIQUE NOT NULL REFERENCES users(username),
    position INT,
    total_bets INT DEFAULT 0,
    weekly_wins INT DEFAULT 0,
    weekly_losses INT DEFAULT 0,
    all_time_wins INT DEFAULT 0,
    all_time_losses INT DEFAULT 0,
    total_amount_won INT DEFAULT 0
    );

COMMIT;
TRUNCATE user_bets, teams, games, users, leaderboard RESTART IDENTITY CASCADE;