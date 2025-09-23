DROP TABLE IF EXISTS teams CASCADE;

DROP TABLE IF EXISTS games;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS user_bets CASCADE;

-- DROP TABLE IF EXISTS bets;

DROP TABLE IF EXISTS rankings;

-- DROP TABLE IF EXISTS favorites;


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
