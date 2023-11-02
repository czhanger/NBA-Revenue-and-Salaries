// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// Date: 6/11/2023
// Originality: Adapted
// Creating delete functions to delete Team from database and delete Team row from table
function deleteTeam(team_id) {
    let data = {
        id: team_id
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-team-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(team_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(team_id){

    let table = document.getElementById("team-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == team_id) {
            table.deleteRow(i);
            break;
        }
    }
}