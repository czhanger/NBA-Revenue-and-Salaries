// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// Date: 6/11/2023
// Originality: Adapted
// Creating delete functions to delete Team Sponsor from database and delete Team Sponsor row from table
function deleteTeamSponsor(teamSponsorID) {
    let data = {
        id: teamSponsorID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-team-sponsor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(teamSponsorID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(teamSponsorID){

    let table = document.getElementById("team-sponsors-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == teamSponsorID) {
            table.deleteRow(i);
            break;
        }
    }
}
