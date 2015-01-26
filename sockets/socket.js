module.exports = function(http,sessionMiddleware,eventEmitter,pool,async,jade) {
  //stack overflow
  Array.prototype.min = function () {
    return this.reduce(function (p, v) {
      return ( p < v ? p : v );
    });
  }

  Array.prototype.max = function () {
    return this.reduce(function (p, v) {
      return ( p > v ? p : v );
    });
  }

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
              username: ysers[i]["username"],
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
        io.emit("updatechat",html,send);
      });
    });

    global.online = [];

    io.on("connection",function(socket){
      var session = socket.request.session;
      if(session.userkey){
        var currentURL;

        console.log(session.userkey+" connected to the server.");

        socket.join(session.userkey);
        online.push(session.userkey);

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

        socket.on("fetchchat",function(account,lastId){
          console.log(session.userkey+" request chat for "+account);
          var subquery = "";
          if(lastId){
            subquery = " && id<"+lastId;
          }

          var query = "SELECT `id`, `recipient`, `sender`, `message`, DATE_FORMAT(`date`,'%b %e %Y %T') AS date FROM `chat_log` WHERE (recipient="+connection.escape(session.userkey)+" || recipient="+connection.escape(account)+") && (sender="+connection.escape(session.userkey)+" || sender="+connection.escape(account)+")"+subquery+" ORDER BY date DESC LIMIT 10";

          console.log(query);

          connection.query(query,function(err,chat){
            if(!err){
              if(chat[0]){
                var send = [];

                //categorize by day
                for(var i = 0; i < chat.length; i++){
                  //find day
                  var temp = chat[i].date.split(" ");
                  var date = temp[0]+" "+temp[1]+" "+temp[2];

                  var hasDate = false;

                  for(var j = 0; j < send.length; j++){
                    if(send[j]["date"] == date){
                      hasDate = true;
                      var index = j;
                      break;
                    }
                  }

                  if(!hasDate){
                    var push = {
                      date: date,
                      messages: [chat[i]]
                    };

                    send.push(push);
                  }
                  else{
                    send[j]["messages"].push(chat[i]);
                  }

                  //var day =
                }

                console.log(JSON.stringify(send,null,1));

                //store ids in temp array
                var id = [];

                for(var i = 0; i < chat.length; i++){
                  id.push(chat[i]["id"]);
                }

                var lastIndex = id.min();

                //console.log(chat);

                socket.emit("fetchchat",account,send,lastIndex);
              }
              else{
                socket.emit("fetchchat",account);
              }

            }
          });
        });

        socket.on("disconnect",function(){
          console.log(session.userkey+" disconnected from the server.");
          online.splice(online.lastIndexOf(session.userkey),1);
          eventEmitter.emit("updatechat");
        });
      }
    });
  });
};
