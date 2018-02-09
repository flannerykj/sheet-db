function loadData(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       var json = JSON.parse(xhttp.response);
       console.log(json.feed.entry);
       readData(json.feed.entry, '#data');
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

export function Reader() {
  return (
    <div>
      <div id="data">data</div>
      <script type="text/javascript">
      $(document).ready(function(){
         loadData("https://spreadsheets.google.com/feeds/cells/1inXfJuDM_lXS_Yaht-AQA5wfqFbriZsiiETT3eUS7fo/od6/public/values?alt=json")
       });
      </script>

    </div>
  )
}

function doData(json) {
    return json.feed.entry;
}

function drawCell(tr, val) {
    var td = $("<td/>");
    tr.append(td);
    td.append(val);
    return td;
}
function drawRow(table, rowData, width) {
  if (rowData == null) return null;
  if (rowData.length == 0) return null;
  var tr = $("<tr/>");
  table.append(tr);
  for(var c=0; c<rowData.length; c++) {
    drawCell(tr, rowData[c]);
  }
  return tr;
}

function drawTable(parent) {
  var table = $("<table class='table'/>");
  $(parent).html(table);
  return table;
}

function readData(spData, parent) {
    var data = spData;
    var table = drawTable(parent);
    var rowData = [];
    var width = 0;
    //loop through all objects (rows)
    for(var r=0; r<data.length; r++) {
        var cell = data[r]["gs$cell"];
        var val = cell["$t"];
        if (cell.row == 1) {
          width=width+1;
        }
        if (cell.col == 1) {
            drawRow(table, rowData, width);
            rowData = [];
        }
        rowData.push(val);
    }
    drawRow(table, rowData);
}
