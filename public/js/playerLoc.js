var callb;
function getServerList() {
    $.ajax({
        method:'get',
        url:'/getLocation',
        success: second_part
    });
}
function second_part(dat) {
	callb=dat;
}
getServerList();
setInterval(function(){getServerList();}, 500);