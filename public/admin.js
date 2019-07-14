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
// function enInputprof(){
//     console.log('change');
//
//     var field = $('#proffields').val();
//     var input = $('#fieldInputProf');
//     input.val('');
//     input.attr('disabled', false);
//     $('#submitProf').attr('disabled', false);
//
//     input.attr('type', 'text');
// }

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

// function getAll(){
//     // GET /data
//
//     $.ajax({
//         method: 'get',
//         url: '/data',
//         success: updateTable,
//         error: ()=>{alert('Database is empty.')}
//     });
//
// }

// function updateTable(results){
// //     var table = $('#users');
// //     table.find("tr:gt(0)").remove();
// //
// //     var rows = results.results;
// //     var i = 0;
// //     rows.forEach(row => {
// //         var newRow = document.createElement("tr");
// //
// //         for(var key in row){
// //             var cell = document.createElement("td");
// //             cell.innerHTML = row[key];
// //             newRow.appendChild(cell);
// //         }
// //         var e = document.createElement('td');
// //         var f = document.createElement('td');
// //         e.innerHTML = '<button style="width:100%;height:100%" class="edit" type="button" onclick="del(this)">Del</button>';
// //         f.innerHTML = '<button style="width:100%;height:100%" id="usersListProf" class="edit" type="button" onclick="getUserProfs(this)">Prof Collection</button>';
// //         newRow.appendChild(e);
// //         newRow.appendChild(f);
// //         table.append(newRow)
// //
// //         if(f.parentElement.parentElement.childNodes[1].innerHTML="Admin"){
// //           document.getElementById("usersListProf").style.display="none";
// //         }
// //         i++;
// //     });
// // }
var x;
function hideProfList(){
  document.getElementById("tableContainerUserProf").style.display="none"

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
  });

}
function displayUserProfs(results){
    if(results.length == 0) {
        alert("No profs exists.");
    } else {
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


}
function del(e){
    var id = e.parentNode.parentNode.id;
    // console.log(e.parentNode.parentNode.parentNode.parentNode.attr('data-id'));
    console.log($('#userTable').attr('data-id'));
    console.log(id);

    if($('#userTable').attr('data-id') == id) {
        alert("You can't delete yourself!");
    } else {
        confirm('Are you sure you want to delete '+ name.toUpperCase() +' from the database?');
        $.ajax({
            method:'delete',
            url:'/removeUser/'+id,
            success: refreshCatalogue,
            error: ()=>{alert('Failed to Delete.')}
        });
    }






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
    $.ajax({
        method: 'get',
        url: '/dataProfDex',
        success: updateTableProfDex
    });

}

function updateTableProfDex(results){
    if(results.length == 0) {
        alert("Database is empty.");
    } else {
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
        success: refreshCatalogue,
        error: ()=>{alert('Failed to Delete.')}
    });
}

$(document).ready(function(){
    refreshCatalogue();

    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });



});

function refreshCatalogue() {
    console.log('refreshing');
    $.ajax({
        method: 'get',
        url: '/data',
        success: printItems
    });
}

function printItems(data) {
    $('#myTable').empty();
    console.log(data.results);
    $.each(data.results, function() {
        $('<tr>').attr('id', this.user_name).appendTo('#myTable');
        $('<td>').attr('class', 'text-center').html(this.user_name).appendTo('#'+this.user_name);
        $('<td>').attr('class', 'text-center').html(this.status).appendTo('#'+this.user_name);
        $('<td>').attr('class', 'text-center').html(this.last_updated).appendTo('#'+this.user_name);
        $('<td>').attr('class', 'text-center').html(this.record_created).appendTo('#'+this.user_name);
        $('<td>').attr('class', 'text-center').html(`<a onclick="del(this)"><i class="fas fa-trash" style="font-size: 20px"></i></a>`).appendTo('#'+this.user_name);
    });
}