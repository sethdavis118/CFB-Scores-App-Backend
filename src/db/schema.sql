BEGIN TRANSACTION;

DROP TABLE IF EXISTS teams CASCADE;

DROP TABLE IF EXISTS games;

DROP TABLE IF EXISTS scoreboards;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS bets;

DROP TABLE IF EXISTS rankings;

DROP TABLE IF EXISTS favorites;

CREATE TABLE
    teams (
        id SERIAL PRIMARY KEY,
        team_id INT,
        school TEXT,
        mascot TEXT,
        abbreviation TEXT,
        division TEXT,
        conference TEXT,
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
    venue JSON,
    home_team JSON,
    away_team JSON,
    weather JSON,
    betting JSON
);

    CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(100) NOT NULL,
    favorite_team INT REFERENCES teams(id) ON DELETE SET NULL,
    favorite_conference TEXT,
    bets INT []
    );

--     CREATE TABLE bets (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
--     game_id UUID REFERENCES games(id) ON DELETE CASCADE,
--     wager_amount NUMERIC(10,2) NOT NULL, -- amount user is betting
--     team_id INT REFERENCES teams(id),    -- which team the user is betting on
--     spread NUMERIC(5,2),                 -- e.g. -7.5, +3.0
--     odds NUMERIC(6,3),                   -- e.g. -110, +150
--     created_at TIMESTAMP DEFAULT NOW()
-- );

CREATE TABLE rankings (
    id SERIAL PRIMARY KEY,
    poll TEXT,
    rank INT,
    team_id INT REFERENCES teams(id),
    school TEXT,
    conference TEXT,
    firstPlaceVotes INT,
    points INT
);

-- CREATE TABLE favorites (
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     team_id INT REFERENCES teams(id) ON DELETE CASCADE,
--     PRIMARY KEY (user_id, team_id)
-- );
COMMIT;