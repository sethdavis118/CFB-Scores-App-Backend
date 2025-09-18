BEGIN TRANSACTION;

DROP TABLE IF EXISTS teams CASCADE;

DROP TABLE IF EXISTS games;

DROP TABLE IF EXISTS odds;

DROP TABLE IF EXISTS scoreboard;


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
        
        

CREATE TABLE
    odds (
        id SERIAL PRIMARY KEY,
        game_id TEXT NOT NULL,
        bookmaker TEXT,
        last_update DATE,
        home_team_id TEXT NOT NULL,
        home_team_point NUMERIC(2, 1),
        away_team_id TEXT NOT NULL,
        away_team_point NUMERIC(2, 1),
        UNIQUE (game_id, last_update)
    );
/*
CREATE TABLE scoreboad (
    id SERIAL PRIMARY KEY,
    tv TEXT,

)
*/
--     CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(50) UNIQUE NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL, 
--     favorite_team REFERENCES teams(id) ON DELETE SET NULL,
-- );

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