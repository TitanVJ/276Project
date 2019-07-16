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
            success: refreshUserCatalogue,
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
    var id = a.parentNode.parentNode.id;

    let s = confirm('Are you sure you want to delete this professor from the database?');

    if (s) {
        $.ajax({
            method:'delete',
            url:'/removeProf/'+id,
            success: refreshProfCatalogue,
            error: ()=>{alert('Failed to Delete.')}
        });
    }
}

$(document).ready(function(){
    refreshUserCatalogue();
    refreshProfCatalogue();

    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#profInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#profTableBody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

});

function refreshUserCatalogue() {
    console.log('refreshing');
    $.ajax({
        method: 'get',
        url: '/data',
        success: printUsers
    });
}

function refreshProfCatalogue() {
    console.log('refreshing');
    $.ajax({
        method: 'get',
        url: '/dataProfDex',
        success: printProfs
    });
}

function printUsers(data) {
    $('#myTable').empty();
    $.each(data.results, function() {
        $('<tr>').attr('id', this.user_name).appendTo('#myTable');
        $('<td>').attr('class', 'text-center').html(this.user_name).appendTo('#'+this.user_name);
        $('<td>').attr('class', 'text-center').html(this.status).appendTo('#'+this.user_name);
        $('<td>').attr('class', 'text-center').html(this.last_updated).appendTo('#'+this.user_name);
        $('<td>').attr('class', 'text-center').html(this.record_created).appendTo('#'+this.user_name);
        $('<td>').attr('class', 'text-center').html(`<a onclick="del(this)"><i class="fas fa-trash" style="font-size: 20px"></i></a>`).appendTo('#'+this.user_name);
    });
}

function printProfs(data) {
    $('#profTableBody').empty();
    $.each(data.results, function() {
        $('<tr>').attr('id', this.prof_id).appendTo('#profTableBody');
         $('<td>').attr('class', 'text-center align-middle').html(`<img src="../images/prof_images/${this.photo_id}.jpg" style="vertical-align: middle;width: auto;height: auto;border-radius: 50%; max-width: 50px; max-height: 50px">`).appendTo('#'+this.prof_id);
        $('<td>').attr('class', 'text-center align-middle').html(this.prof_id).appendTo('#'+this.prof_id);
        $('<td>').attr('class', 'text-center align-middle').html(this.prof_fname).appendTo('#'+this.prof_id);
        $('<td>').attr('class', 'text-center align-middle').html(this.prof_lname).appendTo('#'+this.prof_id);
        $('<td>').attr('class', 'text-center align-middle').html(this.last_updated).appendTo('#'+this.prof_id);
        $('<td>').attr('class', 'text-center align-middle').html(this.record_created).appendTo('#'+this.prof_id);
        $('<td>').attr('class', 'text-center align-middle').html(`<a onclick="delProf(this)"><i class="fas fa-trash" style="font-size: 20px"></i></a>`).appendTo('#'+this.prof_id);
    });
}

function getYears() {
    $.ajax({
        method: 'get',
        url: 'http://www.sfu.ca/bin/wcm/course-outlines',
        success: function(data) {

            data.forEach(function(obj) {
                $('<option>').html(obj.text).appendTo('#year');
            });


            $('#year').selectpicker('render');
        }
    });
}
///get-course-term'+$('#year').val()
$('#year').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

    if($('#term').val()) {
        modalCloseHelper("term");
        modalCloseHelper("dept");
        modalCloseHelper("course_num");
        modalCloseHelper("course_sec");

        $('#term').selectpicker();
        $('#dept').selectpicker();
        $('#course_num').selectpicker();
        $('#course_sec').selectpicker();
    }




    $('#term').prop('disabled', false);
    console.log("Year change");
    $.ajax({
        method: 'get',
        url: `http://www.sfu.ca/bin/wcm/course-outlines?${$('#year').val()}`,
        success: function(data) {

            data.forEach(function(obj) {
                $('<option>').html(obj.text).appendTo('#term');
            });



            $('#term').selectpicker('refresh');
        }
    });
});

$('#term').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

    if($('#dept').val()) {
        modalCloseHelper("dept");
        modalCloseHelper("course_num");
        modalCloseHelper("course_sec");

        $('#dept').selectpicker();
        $('#course_num').selectpicker();
        $('#course_sec').selectpicker();
    }


    $('#dept').prop('disabled', false);
    console.log('term change');
    $.ajax({
        method: 'get',
        url: `http://www.sfu.ca/bin/wcm/course-outlines?${$('#year').val()}/${$('#term').val()}`,
        success: function(data) {

            data.forEach(function(obj) {
                $('<option>').html(obj.text).appendTo('#dept');
            });

            $('#dept').selectpicker('refresh');


        }
    });
});

$('#dept').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

    if($('#course_num').val()) {
        modalCloseHelper("course_num");
        modalCloseHelper("course_sec");

        $('#course_num').selectpicker();
        $('#course_sec').selectpicker();
    }

    $('#course_num').prop('disabled', false);
    console.log('dept change');
    $.ajax({
        method: 'get',
        url: `http://www.sfu.ca/bin/wcm/course-outlines?${$('#year').val()}/${$('#term').val()}/${$('#dept').val()}`,
        success: function(data) {

            data.forEach(function(obj) {
                $('<option>').html(obj.text).appendTo('#course_num');
            });

            $('#course_num').selectpicker('refresh');

        }
    });
});

$('#course_num').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

    if($('#course_sec').val()) {
        modalCloseHelper("course_sec");

        $('#course_sec').selectpicker();
    }

    $('#course_sec').prop('disabled', false);
    console.log('course_sec change');
    $.ajax({
        method: 'get',
        url: `http://www.sfu.ca/bin/wcm/course-outlines?${$('#year').val()}/${$('#term').val()}/${$('#dept').val()}/${$('#course_num').val()}`,
        success: function(data) {

            data.forEach(function(obj) {
                $('<option>').html(obj.text).appendTo('#course_sec');
            });

            $('#course_sec').selectpicker('refresh');
        }
    });
});

$('#course_sec').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    $.ajax({
        method: 'get',
        url: `http://www.sfu.ca/bin/wcm/course-outlines?${$('#year').val()}/${$('#term').val()}/${$('#dept').val()}/${$('#course_num').val()}/${$('#course_sec').val()}`,
        success: function(data) {
            console.log(data);

            // console.log("Name: ", `${data.instructor[0].commonName.toUpperCase()}_${data.instructor[0].lastName.toUpperCase()}`);

            $('#profPicture').empty();
            $('#modalFoot').empty();
            console.log(data.instructor ==undefined);
            if(data.instructor == undefined) {
                $(`<h5> The SFU Course Outlines API could not get info on this course :( </h5>`).appendTo('#profPicture');
            } else {
                $.ajax({
                    url:`/check-file/${data.instructor[0].commonName.toUpperCase()}_${data.instructor[0].lastName.toUpperCase()}.jpg`,
                    type:'GET',
                    success: function(resp) {

                        if(resp) {
                            $(`<h5 id="profName"> ${data.instructor[0].name}</h5>`).appendTo('#profPicture');
                            $(`<img id="profPic" data-fname="${data.instructor[0].commonName}" data-lname="${data.instructor[0].lastName}" src="../images/prof_images/${data.instructor[0].commonName.toUpperCase()}_${data.instructor[0].lastName.toUpperCase()}.jpg" class="img-thumbnail rounded" style="width: 40%;">`).appendTo('#profPicture');
                            $(`<button class="btn btn-primary" onclick="addExistingProf()">Create</button>`).appendTo('#modalFoot');

                        } else {
                            $(`<h5> No photo could be found for ${data.instructor[0].name}!</h5>`).appendTo('#profPicture');
                            $(`<form id="newProfForm" name="newProfForm" action="/add-new-prof" method="post" enctype = multipart/form-data>               
                                    <div class="custom-file mb-3">
                                        <input type="text" class="custom-file-input" id="fname" name="fname" value="${data.instructor[0].firstName}" hidden>
                                        <input type="text" class="custom-file-input" id="common" name="common" value="${data.instructor[0].commonName}" hidden>
                                        <input type="text" class="custom-file-input" id="lname" name="lname" value="${data.instructor[0].lastName}" hidden>
                                        <input type="file" class="custom-file-input" id="customFile" name="filename" accept="image/*" >
                                        <label class="custom-file-label" for="customFile">Choose file</label>
                                    </div>
                                    <div class="mt-3">
                                        <button class="btn btn-primary" onclick="addNewProf()">Create & Upload</button>
                                    </div>
                               </form>`).appendTo('#profPicture');

                            $(".custom-file-input").on("change", function() {
                                var fileName = $(this).val().split("\\").pop();
                                $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
                            });
                        }

                    }
                });
            }
        }
    });
});


$('#new_prof').on('hidden.bs.modal', function (e) {

    modalCloseHelper("term");
    modalCloseHelper("dept");
    modalCloseHelper("course_num");
    modalCloseHelper("course_sec");

});

function modalCloseHelper (id) {
    $('#profPicture').empty();
    $('#modalFoot').empty();
    document.getElementById(`${id}`).options.length = 0;
    $(`#${id}`).prop('disabled', true);
    $(`#${id}`).attr('readonly', true);
    $(`#${id}`).selectpicker('refresh');
}

function addExistingProf() {
    console.log($('#profPic').attr("data-fname"));
    console.log($('#profPic').attr("data-lname"));


    $.ajax({
        method: 'POST',
        url: `/addProfDex/${$('#profName').html()}?fname=${$('#profPic').attr("data-fname")}&lname=${$('#profPic').attr("data-lname")}`,
        success: function(data) {
            if(data == 'success') {
                $('#new_prof').modal('hide')
                refreshProfCatalogue()
            } else {
                alert("Adding professor to profdex failed!")
            }
        }
    });
}

function addNewProf() {

}

// TODO: https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
















