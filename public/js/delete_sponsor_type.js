// Reference: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
// Date: 6/11/2023
// Originality: Adapted
// Creating delete functions to delete Sponsor Type from database and delete Sponsor Type row from table
function deleteSponsorType(sponsorTypeID) {
    let data = {
        id: sponsorTypeID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-sponsor-type-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(sponsorTypeID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(sponsorTypeID){

    let table = document.getElementById("sponsor-types-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == sponsorTypeID) {
            table.deleteRow(i);
            break;
        }
    }
}
