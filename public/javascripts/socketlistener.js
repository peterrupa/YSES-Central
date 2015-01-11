socket = io();

socket.emit('initial',location.pathname);

$(document).ready(function(){
  $("#logout").on('submit',function(){
    socket.disconnect();
  });

  $("body").on("click",".ajax",function(){
    socket.emit('changeurl',location.pathname);
  });
});
