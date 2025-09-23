BEGIN TRANSACTION;

DROP TABLE IF EXISTS teams CASCADE;

DROP TABLE IF EXISTS games;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS user_bets;


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
        game_id INT UNIQUE,
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

/* CREATE TABLE scoreboards (
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
    venue JSON,
    home_team JSON,
    away_team JSON,
    weather JSON,
    betting JSON
); */
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(50) NOT NULL,
    favorite_team INT REFERENCES teams(id) ON DELETE SET NULL,
    favorite_conference TEXT,
    bets JSON,
    active BOOLEAN DEFAULT true
    );

CREATE TABLE user_bets (
    id  UUID DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    game_id INT NOT NULL,
    amount INT,
    spread INT,
    bet_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
        REFERENCES users(user_id),
    CONSTRAINT fk_game_id
        FOREIGN KEY (game_id)
        REFERENCES games(game_id)
);
COMMIT;