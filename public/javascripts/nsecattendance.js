$(document).ready(function(){
  socket.off('secattendanceedit');
  socket.on('secattendanceedit',function(){
    //request to server for data update
    $.ajax({
      url: "/nsecattendance/content",
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
