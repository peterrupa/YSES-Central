module.exports = function(http,sessionMiddleware,eventEmitter,pool,async,jade) {
  var io = require('socket.io').listen(http);

  pool.getConnection(function(err,connection){
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
      io.to('/accountvalidator').emit("newaccount",send);
      eventEmitter.emit("updatechat",online);
    });

    eventEmitter.on('updateaccountvalidator',function(data){
      io.to('/accountvalidator').emit("updateaccountvalidator",data);
    });

    eventEmitter.on('spadattendanceedit',function(){
      io.to('/padattendance').emit("spadattendanceedit");
    });

    eventEmitter.on('secattendanceedit',function(){
      io.to('/attendance').emit("secattendanceedit");
    });

    eventEmitter.on('updatechat',function(){
      async.waterfall([
        function(callback){
          //fetch list of ysers
          var query = "SELECT `username`, `first_name`, `picture` FROM `accounts` WHERE 1 ORDER BY `first_name`";

          connection.query(query,function(err,ysers){
            if(err) callback(err);
            else callback(null,ysers);
          });
        },
        function(ysers,callback){
          //separate online users from offline
          var send = {online:[],offline:[]};

          for(var i = 0; i < ysers.length; i++){
            var push = {
              first_name: ysers[i]["first_name"],
              picture: ysers[i]["picture"].substring(7)
            };

            //check if username exists in online array
            if(online.lastIndexOf(ysers[i]["username"]) != -1){
              send.online.push(push);
            }
            else{
              send.offline.push(push);
            }
          }

          callback(null,send);
        }
      ],
      function(err,send){
        var html = jade.renderFile('views/chatcontainer.jade',send);
        io.emit("updatechat",html);
      });
    });

    global.online = [];

    io.on("connection",function(socket){
      if(socket.request.session.userkey){
        var currentURL;

        console.log(socket.request.session.userkey+" connected to the server.");

        socket.join(socket.request.session.userkey);
        online.push(socket.request.session.userkey);

        eventEmitter.emit("updatechat",online);

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
          online.splice(online.lastIndexOf(socket.request.session.userkey),1);
          eventEmitter.emit("updatechat");
        });
      }
    });
  });
};
