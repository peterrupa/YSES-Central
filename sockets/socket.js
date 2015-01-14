module.exports = function(http,sessionMiddleware,eventEmitter) {
  var io = require('socket.io').listen(http);

  io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  eventEmitter.on("newlogbookdb",function(post){
    io.to('/').emit("newlogbookpost",post);
  });

  eventEmitter.on("announcementpost",function(post){
    io.to('/').to('/announcementposter').emit("announcementpost",post);
  });

  eventEmitter.on("newaccount",function(data){
     var student_number = data["sn-year"]+"-"+data["sn-number"];
     var send = {
       first_name: data["first_name"],
       middle_name: data["middle_name"],
       last_name: data["last_name"],
       org_class: data["org_class"],
       department: data["department"],
       student_number: student_number,
       username: data["username"],
       org_batch: data["org_batch"],
       univ_batch: data["sn-year"],
       mentor: data["mentor"],
       mentee: data["mentee"],
       birthday: data["birthday"],
       home_address: data["home_address"],
       college_address: data["college_address"],
       exec_position: data["exec_position"]?data["exec_position"]:null,
       picture: data["picture"]
    };
    console.log(send);
    io.to('/accountvalidator').emit("newaccount",send);
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
    });

    socket.on("disconnect",function(){
      console.log(socket.request.session.userkey+" disconnected from the server.");
    });
  });
};
