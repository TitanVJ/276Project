

function back(){
    window.history.back();
}

function home(){
    window.location.href="././game.html"
}

function radio_input(url){
    window.location.href = "../"+url;
}




/*
function getAllProfDex(){
    // GET /data
    console.log('getAllProfDex');
    $.ajax({
        method: 'get',
        url: '/dataProfDex',
        success: something,
        error: ()=>{alert('Database is empty.')}
    });
}

function something(){
    { <figure>
        <a href="page.html">
            <img src="./images/bulatov.jpg"/>
            <figcaption>Andrei Bulatov 
                <!--<br>prof type-->
            </figcaption>
        </a>
    </figure> }
}


function searchProfDex(){
        $.ajax({
        method: 'get',
        url: '/searchProfDex?column='+$('#fields').val() + '&value=' + $('#fieldInput').val(),
        success: updateTable,
        error: ()=>{alert('No such user(s) exist.');}
    });
}*/

