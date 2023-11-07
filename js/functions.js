function open_tab(evt, tab_name) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tab_name).style.display = "block";
  evt.currentTarget.className += " active";
}

function load_file(file_path, div_id){
  $.ajax({
    url: file_path,
    success: function (data){
      var rows = data.split("\n");
      // Create table element
      var table = document.createElement("table");
      var header = table.createTHead();
      var body = table.createTBody();
      // Fill the table
      for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].split(",");
        if (cells.length > 1) {
          if (i == 0){
            var row = header.insertRow(0);
            for (var j = 0; j < cells.length; j++) {
              var cell = row.insertCell(-1);
              cell.innerHTML = "<b>" + cells[j] + "</b>";
            }
          } else{
            var row = body.insertRow(-1);
            for (var j = 0; j < cells.length; j++) {
              var cell = row.insertCell(-1);
              if (cells[j].includes(" Day ")){
                 cell.innerHTML = "<b>" + cells[j] + "</b>";
              }else{
                 cell.innerHTML = cells[j];
              }
            }
          }
        }
      }
      // Add table to div
      var dvCSV = document.getElementById(div_id);
      dvCSV.innerHTML = "";
      dvCSV.appendChild(table);
    }
  });
}
