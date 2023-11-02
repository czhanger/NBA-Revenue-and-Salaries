// App.js

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
// Date: 6/11/2023
// Originality: Adapted
// Used the example to setup Node.js SETUP, ROUTES, and LISTENERS

/*
    SETUP
*/

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
// Date: 6/11/2023
// Originality: Adapted
// Used the example to setup express, the PORT #, and handlebars
var express = require('express');   // use the express library for the web server
var app     = express();            
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 30321;                 
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// Date: 6/11/2023
// Originality: Adapted
// Read home page
app.get('/', function(req,res)
{
    res.render('index');
})

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// Date: 6/11/2023
// Originality: Adapted
// Read Players page
app.get('/players', function(req, res)
    {  
        let query1 = "SELECT * FROM Players;";               // Define our query

        let query2 = "SELECT * FROM Teams";                  // Teams for dropdown menu and map

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let players = rows

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box
// Date: 6/11/2023
// Originality: Adapted
// Creating dynamic dropdown using Team Names instead of Team IDs
            db.pool.query(query2, function(error, rows, fields){

                let teams = rows
                let teammap = {}
                teams.map(team => {
                    let id = parseInt(team.team_id, 10);
                    teammap[id] = team["team_name"]
                })

                players = players.map(person => {
                    return Object.assign(person, {team_id: teammap[person.team_id]})  // map team name to team id
                })

                res.render('players', {data: players, teams: teams});
            })                  
        })                                                      
    });                                                         

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
// Date: 6/11/2023
// Originality: Adapted
// Add new player
app.post('/add-player-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let team_id = parseInt(data['input-teamid']);
    if (isNaN(team_id))
    {
        team_id = 'NULL'
    }

    let contract_length = parseInt(data['input-clength']);
    if (isNaN(contract_length))
    {
        contract_length = 'NULL'
    }

    let annual_salary = parseInt(data['input-asalary']);
    if (isNaN(annual_salary))
    {
        annual_salary = 'NULL'
    }

    let total_salary = parseInt(data['input-tsalary']);
    if (isNaN(total_salary))
    {
        total_salary = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Players (team_id, first_name, last_name, age, contract_length, annual_salary, total_salary) 
    VALUES (${team_id}, '${data['input-fname']}', '${data['input-lname']}', '${data['input-age']}', ${contract_length}, ${annual_salary}, ${total_salary})`;

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error and send HTTP response 400 for a bad request
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/players');
        }
    })
});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// Date: 6/11/2023
// Originality: Adapted
// Delete a player
app.delete('/delete-player-ajax/', function(req,res,next){
    let data = req.body;
    let playerID = parseInt(data.id);
    let deletePlayer = `DELETE FROM Players WHERE player_id = ?`;
  
          // Run the 1st query
          db.pool.query(deletePlayer, [playerID], function(error, rows, fields){
              if (error) {
  
              
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                res.sendStatus(204);
              }
  })});

//Update existing player
app.post('/update-player-form', function(req, res) {
    let playerId = req.body.player_id;
    let data = req.body;

    // Capture NULL values
    let team_id = parseInt(data['input-teamid']);
    if (isNaN(team_id)) {
        team_id = 'NULL';
    }

    let contract_length = parseInt(data['input-clength']);
    if (isNaN(contract_length)) {
        contract_length = 'NULL';
    }

    let annual_salary = parseInt(data['input-asalary']);
    if (isNaN(annual_salary)) {
        annual_salary = 'NULL';
    }

    let total_salary = parseInt(data['input-tsalary']);
    if (isNaN(total_salary)) {
        total_salary = 'NULL';
    }

    // Create the query to update player information
    let query = `
        UPDATE Players
        SET
            team_id = ${team_id},
            first_name = '${data['input-fname']}',
            last_name = '${data['input-lname']}',
            age = '${data['input-age']}',
            contract_length = ${contract_length},
            annual_salary = ${annual_salary},
            total_salary = ${total_salary}
        WHERE
            player_id = ${playerId}
    `;

    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/players');
        }
    });
});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// Date: 6/11/2023
// Originality: Adapted
// Read Sponsor_types page
app.get('/sponsor_types', function(req,res)
    {
        let sponsor_type_query = "SELECT * FROM Sponsor_Types;";

        db.pool.query(sponsor_type_query, function(error, rows, fields){
            res.render('sponsor_types', {data: rows})
        })
    });

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
// Date: 6/11/2023
// Originality: Adapted
// Add new sponsor_type
app.post('/add-sponsor-type-form', function(req,res)
{
    let data = req.body;

    query1 =  `INSERT INTO Sponsor_Types (sponsor_type) VALUES ('${data['input-stname']}')`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/sponsor_types');
        }
    })
});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// Date: 6/11/2023
// Originality: Adapted
// Delete sponsor_type
app.delete('/delete-sponsor-type-ajax/', function(req,res,next){
    let data = req.body;
    let sponsortypeID = parseInt(data.id);
    let deleteSponsorType = `DELETE FROM Sponsor_Types WHERE sponsor_type_id = ?`

    db.pool.query(deleteSponsorType, [sponsortypeID], function(error, rows, fields){
       if (error) {
        console.log(error);
        res.sendStatus(400);
       }
       else
       {
        res.sendStatus(204);
       }
})});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// Date: 6/11/2023
// Originality: Adapted
// Delete sponsor
app.delete('/delete-sponsor-ajax/', function(req,res,next){
    let data = req.body;
    let sponsorid = parseInt(data.id);
    let deleteSponsor = `DELETE FROM Sponsors WHERE sponsor_id = ?`

    db.pool.query(deleteSponsor, [sponsorid], function(error, rows, fields){
       if (error) {
        console.log(error);
        res.sendStatus(400);
       }
       else
       {
        res.sendStatus(204);
       }
})});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// Date: 6/11/2023
// Originality: Adapted
// Delete team
app.delete('/delete-team-ajax/', function(req,res,next){
    let data = req.body;
    let teamID = parseInt(data.id);
    let deleteTeam = `DELETE FROM Teams WHERE team_id = ?`

    db.pool.query(deleteTeam, [teamID], function(error, rows, fields){
       if (error) {
        console.log(error);
        res.sendStatus(400);
       }
       else
       {
        res.sendStatus(204);
       }
})});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// Date: 6/11/2023
// Originality: Adapted
// Read Team_Sponsors Page
app.get('/team_sponsors', function(req,res)
{
    let query1 = "SELECT * FROM Team_Sponsors;";

    let query2 = "SELECT * FROM Teams;";            // Teams and Sponsors for dropdown menu and map
    let query3 = "SELECT * FROM Sponsors;";

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box
// Date: 6/11/2023
// Originality: Adapted
// Creating dynamic dropdowns using Team Names instead of Team IDs and Sponsor Names instead of Sponsor IDs
    db.pool.query(query1, function(error, rows, fields){

        let team_sponsors = rows

        db.pool.query(query2, function(error, rows, fields){

            let teams = rows

            db.pool.query(query3, function(error, rows, fields){

                let sponsors = rows
                
                let teammap = {}
                teams.map(team => {
                    let id = parseInt(team.team_id, 10);
                    teammap[id] = team["team_name"]
                })

                let sponsormap = {}
                sponsors.map(sponsor => {
                    let id = parseInt(sponsor.sponsor_id, 10);
                    sponsormap[id] = sponsor["sponsor_name"]
                })

                team_sponsors = team_sponsors.map(team_sponsor => {
                    return Object.assign(team_sponsor, {team_id: teammap[team_sponsor.team_id]}, {sponsor_id: sponsormap[team_sponsor.sponsor_id]})
                })

                res.render('team_sponsors', {data: team_sponsors, teams: teams, sponsors: sponsors})
            })
        })
        
    })
});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
// Date: 6/11/2023
// Originality: Adapted
// Add new Team_Sponsor
app.post('/add-teamsponsor-form', function(req, res)
{
    let data = req.body;
    query1 = `INSERT INTO Team_Sponsors (sponsor_id, team_id) VALUES ('${data['input-sponsorid']}', '${data['input-teamid']}')`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/team_sponsors');
        }
    })
});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// Date: 6/11/2023
// Originality: Adapted
// Delete existing Team_Sponsor
app.delete('/delete-team-sponsor-ajax/', function(req, res, next){
    let data = req.body;
    let teamSponsorID = parseInt(data.id);
    let deleteTeamSponsor = `DELETE FROM Team_Sponsors WHERE team_sponsor_id = ?`;

        db.pool.query(deleteTeamSponsor, [teamSponsorID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }

            else
            {
                res.sendStatus(204);
            }
    })});

// Update existing Team_Sponsor
app.post('/update-team-sponsor-form', function(req, res){
    let teamSponsorID = req.body.team_sponsor_id;
    let data = req.body;

    let query = `
    UPDATE Team_Sponsors
    SET
        team_id = '${data['input-teamid']}',
        sponsor_id = '${data['input-sponsorid']}'
    WHERE
        team_sponsor_id = ${teamSponsorID}
    `;

    db.pool.query(query, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/team_sponsors')
        }
    });
});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// Date: 6/11/2023
// Originality: Adapted
// Read Teams
app.get('/teams', function(req, res){
    let query1 = "SELECT * FROM Teams;";

    db.pool.query(query1, function(error, rows, fields){
        res.render('teams', {data: rows})
    })
});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
// Date: 6/11/2023
// Originality: Adapted
// Add new Teams
app.post('/add-team-form', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO Teams (team_name, gate_receipts) VALUES ('${data['input-tname']}', '${data['input-greceipts']}')`;
    
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/teams');
        }
    })
});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
// Date: 6/11/2023
// Originality: Adapted
// Read Sponsors
app.get('/sponsors', function(req,res){
    let query1 = "SELECT * FROM Sponsors;";

    let query2 = "SELECT * FROM Sponsor_Types;";

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box
// Date: 6/11/2023
// Originality: Adapted
// Creating dynamic dropdown using Sponsor Types instead of Sponsor Type IDs
    db.pool.query(query1, function(error, rows, fields){
        
        let sponsors = rows

        db.pool.query(query2, function(error, rows, fields){

            let sponsor_types = rows
            let sponsor_type_map = {}
            sponsor_types.map(sponsor_type => {
                let id = parseInt(sponsor_type.sponsor_type_id, 10);
                sponsor_type_map[id] = sponsor_type["sponsor_type"]
            })

            sponsors = sponsors.map(sponsor => {
                return Object.assign(sponsor, {sponsor_type_id: sponsor_type_map[sponsor.sponsor_type_id]})  // map sponsor_type to id
            })

            res.render('sponsors', {data: sponsors, sponsor_types: sponsor_types})
        })
    })
});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
// Date: 6/11/2023
// Originality: Adapted
// Add new Sponsors
app.post('/add-sponsor-form', function(req, res){
    let data = req.body;
    
    query1 = `INSERT INTO Sponsors (sponsor_name, sponsor_revenue, sponsor_type_id) VALUES ('${data['input-sponsor-name']}', '${data['input-sponsor-revenue']}', '${data['input-sponsor-type-id']}')`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/sponsors')
        }
    })
});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// Date: 6/11/2023
// Originality: Adapted
// Delete sponsor
app.delete('/delete-sponsor-ajax/', function(req,res,next){
    let data = req.body;
    let sponsorid = parseInt(data.id);
    let deleteSponsor = `DELETE FROM Sponsors WHERE sponsor_id = ?`

    db.pool.query(deleteSponsor, [sponsorid], function(error, rows, fields){
       if (error) {
        console.log(error);
        res.sendStatus(400);
       }
       else
       {
        res.sendStatus(204);
       }
})});

// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// Date: 6/11/2023
// Originality: Adapted
// Delete team
app.delete('/delete-team-ajax/', function(req,res,next){
    let data = req.body;
    let teamID = parseInt(data.id);
    let deleteTeam = `DELETE FROM Teams WHERE team_id = ?`

    db.pool.query(deleteTeam, [teamID], function(error, rows, fields){
       if (error) {
        console.log(error);
        res.sendStatus(400);
       }
       else
       {
        res.sendStatus(204);
       }
})});

/*

    LISTENER
*/
app.listen(PORT, function(){           
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});