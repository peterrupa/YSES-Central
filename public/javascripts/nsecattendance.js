$(document).ready(function(){
  socket.off('secattendanceedit');
  socket.on('secattendanceedit',function(){
    //request to server for data update
    $.ajax({
      url: "http://localhost:8080/nsecattendance/content",
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
