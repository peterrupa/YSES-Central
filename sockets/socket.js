module.exports = function(http,sessionMiddleware,eventEmitter) {
  var io = require('socket.io').listen(http);

  io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  eventEmitter.on("newlogbookdb",function(post){
    io.to('/').emit("newlogbookpost",post);
  });

  io.on("connection",function(socket){
    var currentURL;

    console.log(socket.request.session.userkey+" connected to the server.");

    socket.on("initial",function(url){
      currentURL = url;
      socket.join(url);
    });

    socket.on("changeurl",function(url){
      socket.leave(currentURL);
      socket.join(url);
      currentURL = url;
      console.log(socket.adapter.rooms);
    });

    socket.on("disconnect",function(){
      console.log(socket.request.session.userkey+" disconnected from the server.");
    });
  });
};
