$(document).ready(function(){
  socket.off('spadattendanceedit');
  socket.on('spadattendanceedit',function(){
    //request to server for data update
    $.ajax({
      url: "/jpadattendance/content",
      type: "GET",
      success: function(res){
        $("#content").html(res);
      },
      error: function (e){
        console.dir(e);
      }
    });
  });
});
