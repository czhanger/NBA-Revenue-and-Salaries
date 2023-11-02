-- CS340 GROUP 64 PROJECT NBA TEAM REVENUE AND SALARIES DML Queries

-- Create a team (C)
INSERT INTO Teams (team_name, gate_receipts)
VALUES (:team_nameInput, :gate_receipts);

-- Get team names and gate receipts based on team name (R)
SELECT team_name, gate_receipts WHERE team_name = :team_name_selected_from_team_page;

-- Update a specific team name with new team name or update gate receipts (U)
UPDATE Teams SET team_name = :team_nameInput, gate_receipts = :gate_receiptsInput WHERE team_name = :team_name_selected_from_team_page

-- Deletes a team based on team id (D)
DELETE FROM Teams where team_id = :team_id_that_gets_removed


-- Create a Player (C)
INSERT INTO Players (team_id, first_name, last_name, age, contract_length, annual_salary, total_salary)
VALUES (:team_idInput, :first_nameInput, :last_nameInput, :ageInput, :contract_lengthInput, :annual_salaryInput, :total_salaryInput);

-- Get a player's details based on first and last name (R)
SELECT first_name, last_name, age, contract_length, annual_salary, total_salary WHERE ((first_name = :first_name_selected_from_player_page) AND (last_name = :last_name_selected_from_player_page));

-- Update Player stats based on first and last name (U)
UPDATE Players SET first_name = :first_nameInput, last_name = :last_nameInput, age = :ageInput, contract_length = :contract_lengthInput, annual_salary = :annual_salaryInput. total_salary = :total_salaryInput WHERE ((first_name = :first_name_selected_from_player_page) AND (last_name = :last_name_selected_from_player_page))

-- Deletes a Player based on a specific Player id (D)
DELETE FROM Players WHERE player_id = :player_id_that_gets_removed

-- Searches database and returns all players given a specific team id
SELECT first_name, last_name, age, contract_length, annual_salary, total_salary FROM Players WHERE team_id = :specific_team_id_input;


-- Create a Sponsor (C)
INSERT INTO Sponsors (sponsor_name, sponsor_revenue, sponsor_type_id)
VALUES (:sponsor_nameInput, :sponsor_revenueInput, sponsor_type_idInput);

-- Get the sponsor with the minimum revenue (R)
SELECT sponsor_name, sponsor_type_id, sponsor_revenue FROM Sponsors WHERE sponsor_revenue = (SELECT MIN(sponsor_revenue) FROM Sponsors);

-- Get the sponsor with the maximum revenue (R)
SELECT sponsor_name, sponsor_type_id, sponsor_revenue FROM Sponsors WHERE sponsor_revenue = (SELECT MAX(sponsor_revenue) FROM Sponsors);

-- Update Sponsor statistics for Sponsor with minimum revenue (U)
UPDATE Sponsors SET sponsor_name = :sponsor_nameInput, sponsor_revenue = :sponsor_revenueInput, sponsor_type_id = :sponsor_type_idInput WHERE sponsor_revenue = (SELECT MIN(sponsor_revenue) FROM Sponsors)

-- Update Sponsor statistics for Sponsor with maximum revenue (U)
UPDATE Sponsors SET sponsor_name = :sponsor_nameInput, sponsor_revenue = :sponsor_revenueInput, sponsor_type_id = :sponsor_type_idInput WHERE sponsor_revenue = (SELECT MAX(sponsor_revenue) FROM Sponsors)

-- Update Sponsor statistics for Sponsor with specific sponsor type id (U)
UPDATE Sponsors SET sponsor_name = :sponsor_nameInput, sponsor_revenue = :sponsor_revenueInput, sponsor_type_id = :sponsor_type_idInput WHERE sponsor_type_id = :sponsor_type_idInput

-- Deletes a Sponsor based on specific sponsor id (D)
DELETE FROM Sponsors WHERE sponsor_id = :sponsor_id_that_gets_removed


-- Create a Sponsor Type (C)
INSERT INTO Sponsor_Types (sponsor_type)
VALUES (:sponsor_typeInput);

-- Get all of the sponsor types (R)
SELECT sponsor_type FROM Sponsor_Types;

-- Update the sponsor type based on specific sponsor type id (U)
UPDATE Sponsor_Types SET sponsor_type = :sponsor_typeInput WHERE sponsor_type_id = :sponsor_type_idInput

-- Deletes a sponsor type based on a specific sponsor type id (D)
DELETE FROM Sponsor_Types WHERE sponsor_type_id = :sponsor_type_id_that_gets_removed


-- Create a Team Sponsor (C)
INSERT INTO Team_Sponsors (sponsor_id, team_id)
VALUES (:sponsor_idInput, :team_idInput);

-- Get the sponsor id and team id from Team Sponsors (R)
SELECT sponsor_id, team_id FROM Team_Sponsors;

-- Updates a team sponsor info based on a specific team sponsor id (U)
UPDATE Team_Sponsors SET sponsor_id = :sponsor_idInput, team_id = :team_idInput WHERE team_sponsor_id = :team_sponsor_idInput

-- Deletes a team sponsor based on specific team sponsor id (D)
DELETE FROM Team_Sponsors WHERE team_sponsor_id = :team_sponsor_id_that_gets_removed