

function back(){
    window.history.back();
}

function home(){
    window.location.href="././game.html"
}

function radio_input(url){
    window.location.href = "../"+url;
}

function specialback(){
    location.reload();
}

function loadProf(fname, lname){
    $('#selected').removeClass();
    $('#selected').addClass(fname+" "+lname);
    $.ajax({
        method: 'GET',
        url: '/profPagePrev',
        dataType: 'html',
        success: function(data){
            $('#container').html(data);
        }
    });
}

function loadYourProf(fname, lname, id){
    $('#selected').removeClass();
    $('#selected').addClass(fname+" "+lname+" "+id);
    $.ajax({
        method: 'GET',
        url: '/yourProfPagePrev',
        dataType: 'html',
        success: function(data){
            $('#container').html(data);
        }
    });
}