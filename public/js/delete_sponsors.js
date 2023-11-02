// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// Date: 6/11/2023
// Originality: Adapted
// Creating delete functions to delete Sponsor from database and delete Sponsor row from table
function deleteSponsor(sponsor) {
    let data = {
        id: sponsor
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-sponsor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(sponsor);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(sponsor){

    let table = document.getElementById("sponsor-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == sponsor) {
            table.deleteRow(i);
            break;
        }
    }
}