
$(document).ready(function () {
    var jsonData = null;

    var url = "https://nackowskis.azurewebsites.net/api/Auktion/200/";

    /******************************************************************/
// ReSharper disable once JoinDeclarationAndInitializerJs
    var populateTable;
    var loadAjaxCall = function () {
        var myRequest = new XMLHttpRequest();
        myRequest.open('GET', url);
        myRequest.onload = function () {
            jsonData = JSON.parse(myRequest.responseText);
            
            //makeTable(jsonData);
            createTable();
            //populateTable();
        };
        myRequest.send();
    };
    populateTable = function () {
        var col = [];
        for (var i = 0; i < jsonData.length; i++) {
            for (var key in jsonData[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }

            }
        }

        // Create table
        
        var table = document.getElementById("example");
        //table.setAttribute("class", "tablesorter");
        //table.setAttribute("id", "myTable");


        //table.border = "2px";
        //table.cellSpacing = "5px";

        //var thead = table.createTHead();


        //var row = thead.insertRow(-1);
        /*var cell;

        for (var i = 0; i < col.length; i++) {
            cell = row.insertCell(-1);
            cell.innerHTML = col[i];
        }
        */
        var row;
        var cell;

        var tBody = document.createElement("tbody");
        table.appendChild(tBody);

        for (var j = 0; j < jsonData.length; j++) {
            row = tBody.insertRow(-1);
            for (var i = 0; i < col.length; i++) {
                cell = row.insertCell(-1);
                cell.innerHTML = jsonData[j][col[i]];

            }
        }

        //var tFoot = table.createTFoot();
        //row = tFoot.insertRow(-1);
        //for (var i = 0; i < 3; i++) {
        //    cell = row.insertCell(-1);
        //    cell.innerHTML = "Foot" + (i + 1);
        //}

        //var container = document.getElementById("showData");
        //var myContainer = document.getElementById("myContainer");
        //myContainer.appendChild(table);
        //container.appendChild(table);
    };

    var createTable = function () {
        var col = [];
        for (var i = 0; i < jsonData.length; i++) {
            for (var key in jsonData[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }

            }
        }

        // Create table
        var table = document.createElement("table");
        table.setAttribute("class", "tablesorter");
        table.classList.add('table');
        table.classList.add('table-hover');
        table.setAttribute("id", "myTable");

        var thead = table.createTHead();


        var row = thead.insertRow(-1);
        var cell;

        for (var i = 0; i < col.length; i++) {
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
            for (var i = 0; i < col.length; i++) {
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

    var makeTable = function () {
        var col = [];
        for (var i = 0; i < jsonData.length; i++) {
            for (var key in jsonData[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        //debugger

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.setAttribute("class", "tablesorter");

        table.border = "6px";
        table.cellSpacing = "5px";

        var thead = document.createElement("thead");

        //table.classList.add('table-bordered');
        //table.classList.add('table-striped');
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        var tr = table.insertRow(-1); // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th"); // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < jsonData.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = jsonData[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    };
    window.onload = loadAjaxCall;
});

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
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
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
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
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


//searchBtn.addEventListener("click", function(){
//  info.innerHTML = "";
//  var mystring = "";
//  for (var i = 0; i < jsonData.length; i++) {
//    if (jsonData[i].species == searchBox.value){
//      mystring += "<p>" + jsonData[i].name + " is a " + jsonData[i].species + ".</p>";
//    }
//  }
//  if(mystring == "")
//    mystring = "Not found!"
//  info.insertAdjacentHTML('beforeend', mystring);
//});

