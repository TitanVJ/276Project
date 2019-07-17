$('#searchForm').submit((e)=>{
    e.preventDefault();
});
$('#searchFormProf').submit((a)=>{
    a.preventDefault();
});
function enInput(){
    console.log('change');

    var field = $('#fields').val();
    var input = $('#fieldInput');
    input.val('');
    input.attr('disabled', false);
    $('#submit').attr('disabled', false);

    input.attr('type', 'text');
}
function enInputprof(){
    console.log('change');

    var field = $('#proffields').val();
    var input = $('#fieldInputProf');
    input.val('');
    input.attr('disabled', false);
    $('#submitProf').attr('disabled', false);

    input.attr('type', 'text');
}

function search(){
    //loop through from and grab shit
    if($('#fieldInput').disabled){
        return
    }
    $.ajax({
        method: 'get',
        url: '/search?column='+$('#fields').val() + '&value=' + $('#fieldInput').val(),
        success: updateTable,
        error: ()=>{alert('No such user(s) exist.');}
    });
}

function getAll(){
    // GET /data

    $.ajax({
        method: 'get',
        url: '/data',
        success: updateTable,
        error: ()=>{alert('Database is empty.')}
    });

}

function updateTable(results){
    var table = $('#users');
    table.find("tr:gt(0)").remove();

    var rows = results.results;
    var i = 0;
    rows.forEach(row => {
        var newRow = document.createElement("tr");

        for(var key in row){
            var cell = document.createElement("td");
            cell.innerHTML = row[key];
            newRow.appendChild(cell);
        }
        var e = document.createElement('td');
        var f = document.createElement('td');
        var g = document.createElement('td');
        e.innerHTML = '<button style="width:100%;height:100%" class="edit" type="button" onclick="del(this)">Del</button>';
        f.innerHTML = '<button style="width:100%;height:100%" id="usersListProf" class="edit" type="button" onclick="getUserProfs(this)">Prof Collection</button>';
        g.innerHTML = '<button style="width:100%;height:100%" id="usersInventoryList" class="edit" type="button" onclick="getUserInventory(this)">Inventory</button>';
        newRow.appendChild(e);
        newRow.appendChild(f);
        newRow.appendChild(g);
        table.append(newRow)

        if(f.parentElement.parentElement.childNodes[1].innerHTML="Admin"){
          document.getElementById("usersListProf").style.display="none";
          document.getElementById("usersInventoryList").style.display="none";
        }
        i++;
    });
}
var x;
function hideProfList(){
  document.getElementById("tableContainerUserProf").style.display="none"
  document.getElementById("tableContainerInventory").style.display="none"
}
function getUserProfs(f){

  var status = f.parentElement.parentElement.childNodes[1].innerHTML;
  console.log(status);

  var id = f.parentElement.parentElement.childNodes[0].innerHTML;
  document.getElementById('userList').innerHTML = "<h2>" + id + "ProfList</h2>";
  document.getElementById("tableContainerUserProf").style.display="flex"


  $.ajax({
      method:'get',
      url:'/toTable?user='+id,
      success: displayUserProfs,
      error: ()=>{alert('No such Prof(s) exist.');}
  });

}

function getUserInventory(f){

  var status = f.parentElement.parentElement.childNodes[1].innerHTML;
  console.log(status);

  var id = f.parentElement.parentElement.childNodes[0].innerHTML;
  document.getElementById('userInventory').innerHTML = "<h2>" + id + "Inventory</h2>";
  document.getElementById("tableContainerInventory").style.display="flex"


  $.ajax({
      method:'get',
      url:'/toInventory?user='+id,
      success: displayUserInventory,
      error: ()=>{alert('No Inventory exist.');}
  });

}
function displayUserInventory(results){
  var table = $('#userInv');
  table.find("tr:gt(0)").remove();

  var rows = results.results;
  var i = 0;
  rows.forEach(row => {
      var newRow = document.createElement("tr");

      for(var key in row){
          var cell = document.createElement("td");
          cell.innerHTML = row[key];
          newRow.appendChild(cell);
      }
      table.append(newRow);
      i++;
  });
}
function displayUserProfs(results){
  var table = $('#userprofs');
  table.find("tr:gt(0)").remove();

  var rows = results.results;
  var i = 0;
  rows.forEach(row => {
      var newRow = document.createElement("tr");

      for(var key in row){
          var cell = document.createElement("td");
          cell.innerHTML = row[key];
          newRow.appendChild(cell);
      }
      table.append(newRow);
      i++;
  });
}
function del(e){
    var row = e.parentElement.parentElement;
    var id = e.parentElement.parentElement.childNodes[0].innerHTML;
    var name = e.parentElement.parentElement.childNodes[0].innerHTML;

    confirm('Are you sure you want to delete '+ name.toUpperCase() +' from the database?');

    console.log('test');

    $.ajax({
        method:'delete',
        url:'/removeUser/'+id,
        success: getAll,
        error: ()=>{alert('Failed to Delete.')}
    });
    getAll();
}
function searchProfDex(){
    //loop through from and grab shit
    if($('#proffields').disabled){
        return
    }
    $.ajax({
        method: 'get',
        url: '/searchProfDex?column='+$('#proffields').val() + '&value=' + $('#fieldInputProf').val(),
        success: updateTableProfDex,
        error: ()=>{alert('No such Prof(s) exist.');}
    });
}

function getAllProfDex(){
    // GET /data
    console.log("hello");
    $.ajax({
        method: 'get',
        url: '/dataProfDex',
        success: updateTableProfDex,
        error: ()=>{alert('Database is empty.')}
    });

}

function updateTableProfDex(results){
    var table = $('#profs');
    table.find("tr:gt(0)").remove();

    var rows = results.results;
    var i = 0;
    rows.forEach(row => {
        var newRow = document.createElement("tr");

        for(var key in row){
            var cell = document.createElement("td");
            cell.innerHTML = row[key];
            newRow.appendChild(cell);
        }
        var a = document.createElement('td');
        a.innerHTML = '<button style="width:100%;height:100%" class="edit" type="button" onclick="delProf(this)">Del</button>';
        newRow.appendChild(a);
        table.append(newRow);
        i++;
    });

}
function delProf(a){
    var row = a.parentElement.parentElement;
    var id = a.parentElement.parentElement.childNodes[0].innerHTML;
    var name = a.parentElement.parentElement.childNodes[1].innerHTML;

    confirm('Are you sure you want to delete '+ name.toUpperCase() +' from the database?');

    console.log('test');

    $.ajax({
        method:'delete',
        url:'/removeProf/'+id,
        success: getAllProfDex,
        error: ()=>{alert('Failed to Delete.')}
    });
}
