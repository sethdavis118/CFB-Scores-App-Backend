DROP TABLE IF EXISTS teams;

DROP TABLE IF EXISTS games;

DROP TABLE IF EXISTS odds;

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
        away_qtr_scores INT [],
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