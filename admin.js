var textFields = ['name', 'weight', 'height', 'hair_color', 'fav_drink', 'fav_food', 'fav_video_game', 'fav_movie']

$('#searchForm').submit((e)=>{
    e.preventDefault();
});

function enInput(){
    console.log('change');

    var field = $('#fields').val();
    var input = $('#fieldInput');
    input.val('');
    input.attr('disabled', false);
    $('#submit').attr('disabled', false);

    if(field == 'id'){
        input.attr('type', 'number');
    }
    else if(textFields.includes(field)){
        input.attr('type', 'text');
    }
    else if(field == 'gpa'){
        input.attr('type', 'number');
        input.attr('step', '0.01');
        input.attr('min', '0');
        input.attr('max', '4.33');
    }
    else{
        input.attr('disabled', true);
        $('#searchSubmit').attr('disabled', true);
        input.attr('type', 'number');
        input.attr('step', '0.01');
        input.attr('min', '0');
    }
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
        error: ()=>{alert('No such students(s) exist.');}
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
    var table = $('#students');
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
        e.innerHTML = '<button style="width:100%;height:100%" class="edit" type="button" onclick="edit(this)">Edit</button>';
        var d = document.createElement('td');
        d.innerHTML = '<button style="width:100%;height:100%" class="del" type="button" onclick="del(this)">Delete</button>';
        newRow.appendChild(e);
        newRow.appendChild(d);
        table.append(newRow);
        i++;
    });

}
var x;
function edit(e){
    $('#editForm').show();
    $('button.edit').attr('disabled', true);


    console.log(e.parentElement.parentElement.childNodes);
    var cells = e.parentElement.parentElement.childNodes;


}

function del(e){
    var row = e.parentElement.parentElement;
    var id = e.parentElement.parentElement.childNodes[0].innerHTML;
    var name = e.parentElement.parentElement.childNodes[1].innerHTML;

    confirm('Are you sure you want to delete '+ name.toUpperCase() +' from the database?');

    console.log('test');

    $.ajax({
        method:'delete',
        url:'/removeUser/:'+id
    });
}
