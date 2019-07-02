var textFields = ['name', 'weight', 'height', 'hair_color', 'fav_drink', 'fav_food', 'fav_video_game', 'fav_movie']


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
    $('#submit').attr('disabled', false);

    input.attr('type', 'text');
}

function search(){
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
        e.innerHTML = '<button style="width:100%;height:100%" class="edit" type="button" onclick="del(this)">Del</button>';
        f.innerHTML = '<button style="width:100%;height:100%" class="edit" type="button" onclick="toUserTable(this)">Prof Collection</button>';
        newRow.appendChild(e);
        newRow.appendChild(f);
        table.append(newRow);
        i++;
    });

}
var x;
function toUserTable(f){
    var id = f.parentElement.parentElement.childNodes[0].innerHTML;

    $.ajax({
        method:'get',
        url:'/userproflist?user='+id
    });
}
function del(e){
    var row = e.parentElement.parentElement;
    var id = e.parentElement.parentElement.childNodes[0].innerHTML;
    var name = e.parentElement.parentElement.childNodes[1].innerHTML;

    confirm('Are you sure you want to delete '+ name.toUpperCase() +' from the database?');
    $.ajax({
        method:'delete',
        url:'/removeUser/'+id
    });
}
function searchProfDex(){
    if($('#proffields').disabled){
        return
    }
    $.ajax({
        method: 'get',
        url: '/searchProfDex?column='+$('#fields').val() + '&value=' + $('#fieldInput').val(),
        success: updateTableProfDex,
        error: ()=>{alert('No such user(s) exist.');}
    });
}

function getAllProfDex(){
    // GET /data

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
        a.innerHTML = '<button style="width:100%;height:100%" class="edit" type="button" onclick="del(this)">Del</button>';
        newRow.appendChild(a);
        table.append(newRow);
        i++;
    });

}
