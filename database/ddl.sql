-- CS340 GROUP 64 PROJECT NBA TEAM REVENUE AND SALARIES
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create table for Teams
DROP TABLE IF EXISTS Teams;
CREATE TABLE Teams (
    team_id int NOT NULL AUTO_INCREMENT,
    team_name varchar(50) NOT NULL,
    gate_receipts int NOT NULL,
    PRIMARY KEY (team_id)
);

-- Create table for Players
DROP TABLE IF EXISTS Players;
CREATE TABLE Players (
    player_id int NOT NULL AUTO_INCREMENT,
    team_id int,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    age int NOT NULL,
    contract_length int,
    annual_salary int,
    total_salary int,
    PRIMARY KEY (player_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id) ON DELETE SET NULL
);

-- Create table for Sponsors
DROP TABLE IF EXISTS Sponsors;
CREATE TABLE Sponsors(
    sponsor_id int NOT NULL AUTO_INCREMENT,
    sponsor_name varchar(255) NOT NULL,
    sponsor_type_id int NOT NULL,
    sponsor_revenue int NOT NULL,
    PRIMARY KEY (sponsor_id),
    FOREIGN KEY (sponsor_type_id) REFERENCES Sponsor_Types(sponsor_type_id) ON DELETE CASCADE -- IF Sponsor_type is deleted, delete associated sponsors
);

-- Create table for Sponsor_Types
DROP TABLE IF EXISTS Sponsor_Types;
CREATE TABLE Sponsor_Types (
    sponsor_type_id int NOT NULL AUTO_INCREMENT,
    sponsor_type varchar(255) NOT NULL,
    PRIMARY KEY (sponsor_type_id)
);

-- Create table for Team_Sponsors
DROP TABLE IF EXISTS Team_Sponsors;
CREATE TABLE Team_Sponsors (
    team_sponsor_id int NOT NULL AUTO_INCREMENT,
    sponsor_id int,
    team_id int,
    PRIMARY KEY (team_sponsor_id),
    FOREIGN KEY (sponsor_id) REFERENCES Sponsors(sponsor_id) ON DELETE CASCADE,  -- IF Sponsor is deleted, delete associated team sponsors
    FOREIGN KEY (team_id) REFERENCES Teams(team_id) ON DELETE CASCADE  -- IF Team is deleted, delete associated team sponsors
);

-- Insert data into Sponsor_Types
INSERT INTO Sponsor_Types (sponsor_type)
VALUES ('Jersey Sponsor'), ('Digital Marketing'), ('Arena Sponsor');

-- Insert data into Sponsors
INSERT INTO Sponsors (sponsor_name, sponsor_revenue, sponsor_type_id)
VALUES ('Stormx', 8000000, (SELECT sponsor_type_id from Sponsor_Types where sponsor_type='Jersey Sponsor')),
('Bibigo', 20000000, (SELECT sponsor_type_id from Sponsor_Types where sponsor_type='Jersey Sponsor')),
('Infosys', 35000000, (SELECT sponsor_type_id from Sponsor_Types where sponsor_type='Digital Marketing')),
('Voyager', 24000000, (SELECT sponsor_type_id from Sponsor_Types where sponsor_type='Digital Marketing')),
('Crypto.com', 35000000, (SELECT sponsor_type_id from Sponsor_Types where sponsor_type='Arena Sponsor'));

-- Insert data into Teams
INSERT INTO Teams (team_name, gate_receipts)
VALUES ('Blazers', 54000000), ('Lakers', 78000000), ('Knicks', 32000000), ('Mavericks', 34000000), ('76ers', 83000000);

-- Insert data into Players
INSERT INTO Players (team_id, first_name, last_name, age, contract_length, annual_salary, total_salary)
VALUES ((SELECT team_id from Teams where team_name='Blazers'),'Damian', 'Lillard', 32, 4, 42000000, 110000000),
((SELECT team_id from Teams where team_name='Mavericks'), 'Kyrie', 'Irving', 31, 4, 34000000, 158000000),
((SELECT team_id from Teams where team_name='Knicks'), 'Jalen', 'Brunson', 26, 4, 26000000, 104000000),
((SELECT team_id from Teams where team_name='Lakers'), 'Lebron', 'James', 38, 2, 39000000, 289000000),
((SELECT team_id from Teams where team_name='76ers'), 'Joel', 'Embiid', 29, 4, 28000000, 170000000);

-- Insert data into Team_Sponsors
INSERT INTO Team_Sponsors (sponsor_id, team_id)
VALUES ((SELECT sponsor_id from Sponsors where sponsor_name='Stormx'),
(SELECT team_id from Teams where team_name='Blazers')),
((SELECT sponsor_id from Sponsors where sponsor_name='Bibigo'),
(SELECT team_id from Teams where team_name='Lakers')),
((SELECT sponsor_id from Sponsors where sponsor_name='Infosys'),
(SELECT team_id from Teams where team_name='Knicks')),
((SELECT sponsor_id from Sponsors where sponsor_name='Voyager'),
(SELECT team_id from Teams where team_name='Mavericks')),
((SELECT sponsor_id from Sponsors where sponsor_name='Crypto.com'),
(SELECT team_id from Teams where team_name='76ers'));

SET FOREIGN_KEY_CHECKS=1;
COMMIT;