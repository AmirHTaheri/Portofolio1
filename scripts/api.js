
$(document).ready(function () {
    var jsonData = null;
    var col = [];
    var url = "https://nackowskis.azurewebsites.net/api/Auktion/200/";

    /******************************************************************/
// ReSharper disable once JoinDeclarationAndInitializerJs
    var createTable;
    var loadAjaxCall = function () {
        var myRequest = new XMLHttpRequest();
        myRequest.open('GET', url);
        myRequest.onload = function () {
            jsonData = JSON.parse(myRequest.responseText);
            createTable();
        };
        myRequest.send();
    };
    createTable = function () {
        var i;
        for (i = 0; i < jsonData.length; i++) {
            let data = jsonData[i];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }

                }
            }
        }

        // Create table
        var table = document.createElement("table");
        table.setAttribute("class", "tablesorter");
        table.classList.add('table');
        table.classList.add('table-hover');
        table.classList.add('table-responsive');

        table.setAttribute("id", "myTable");
        

        var thead = table.createTHead();
        thead.setAttribute("class", "thead-light");

        var input;
        var placeholder = "Search for";

        var row = thead.insertRow(-1);
        var cell;

        for (i = 0; i < col.length; i++) {
            //input = document.createElement("input");
            //input.setAttribute("class", "form-control");
            //input.setAttribute("onkeyup", "searchFunction(id)");
            //input.setAttribute("id", col[i]);
            //input.setAttribute("placeholder", placeholder + " " + col[i]);
            
            

            cell = row.insertCell(-1);
            cell.innerHTML = col[i];
            // Sorting from header
            let sort = "sortTable(" + i.toString() + ")";
            cell.setAttribute("onclick", sort);
        }

        var tBody = document.createElement("tbody");
        table.appendChild(tBody);

        for (var j = 0; j < jsonData.length; j++) {
            row = tBody.insertRow(-1);
            for (i = 0; i < col.length; i++) {
                cell = row.insertCell(-1);
                cell.innerHTML = jsonData[j][col[i]];

            }
        }

        var myContainer = document.getElementById("myContainer");
        myContainer.appendChild(table);
        $(function () {
            $("table")
                .tablesorter({ widthFixed: true, widgets: ['zebra'] })
                .tablesorterPager({ container: $("#pager") });

        });
    };
    window.onload = loadAjaxCall;
});

function sortTable(n) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    var table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1) ; i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function searchFunction(id) {
    var td, i;
    var input = document.getElementById(id);
    var filter = input.value.toUpperCase();
    var table = document.getElementById("myTable");
    var tr = table.getElementsByTagName("tr");
    var index = 0; //debugger;
    switch (id) {
        case "myInput":
            index = 0;
            break;
        case "Titel":
            index = 1;
            break;
        case "Beskrivning":
            index = 2;
            break;
        case "SlutDatum":
            index = 4;
            break;
        case "Gruppkod":
            index = 5;
            break;
        case "Price":
            index = 6;
            break;
        default:
            index = 0;
            break;

    }

    for (i = 0; i < tr.length; i++) {

        td = tr[i].getElementsByTagName("td")[index];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}

