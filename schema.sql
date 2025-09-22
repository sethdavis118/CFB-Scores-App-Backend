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

CREATE TABLE users {
    user_id SERIAL PRIMARY KEY
    username TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
}

CREATE TABLE user_bets {
    id SERIAL PRIMARY KEY,
    user_id INT,
    game_id INT,
    amount INT,
    time_stamp TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP)
    [CONSTRAINT fk_user_id]
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
    [CONSTRAINT fk_game_id]
        FOREIGN KEY(game_id
        REFERENCES games(game_id))
}

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

--CREATE TABLE rankings (
--     id SERIAL PRIMARY KEY,
--     poll TEXT
--     rank INT,
--     team_id INT REFERENCES teams(id),
--     school TEXT,
--     conference TEXT,
--     firstPlaceVotes INT,
--     points INT
--);

-- CREATE TABLE favorites (
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     team_id INT REFERENCES teams(id) ON DELETE CASCADE,
--     PRIMARY KEY (user_id, team_id)
-- );
COMMIT;