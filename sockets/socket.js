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
    var mentee = [];
    for(var i = 1; i <= parseInt(data["numberofmentees"]); i++){
      mentee.push(data["mentee-"+i]);
    }
    var studentnumber = data["sn-year"]+"-"+data["sn-number"];
    var send = {
      first_name: data["first-name"],
      middle_name: data["middle-name"],
      last_name: data["last-name"],
      org_class: data["org-class"],
      department: data["department"],
      student_number: studentnumber,
      username: data["username"],
      org_batch: data["org-batch"],
      univ_batch: data["sn-year"],
      mentor: data["mentor"],
      mentee: mentee,
      birthday: data["bday"],
      home_address: data["homeAdd"],
      college_address: data["collegeAdd"],
      exec_position: data["position"]?data["position"]:null,
      picture: data["picture"]
    };
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
