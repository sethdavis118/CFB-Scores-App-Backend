DROP TABLE IF EXISTS teams CASCADE;

DROP TABLE IF EXISTS games CASCADE;

DROP TABLE IF EXISTS odds;

CREATE TABLE
    teams (
        team_id TEXT PRIMARY KEY,
        school TEXT NOT NULL,
        mascot TEXT NOT NULL,
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
        game_id TEXT PRIMARY KEY,
        commence_time DATE NOT NULL,
        home_team_id TEXT NOT NULL,
        away_team_id TEXT NOT NULL,
        FOREIGN KEY(home_team_id) REFERENCES teams(team_id),
        FOREIGN KEY(away_team_id) REFERENCES teams(team_id)
    );

CREATE TABLE
    odds (
        game_id TEXT NOT NULL REFERENCES games (game_id),
        bookmaker TEXT,
        last_update DATE,
        home_team_id TEXT NOT NULL,
        home_team_point NUMERIC(2, 1),
        away_team_id TEXT NOT NULL,
        away_team_point NUMERIC(2, 1),
        FOREIGN KEY(home_team_id) REFERENCES teams(team_id),
        FOREIGN KEY(away_team_id) REFERENCES teams(team_id),
        UNIQUE (game_id, last_update)
    );