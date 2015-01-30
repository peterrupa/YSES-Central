var menu_head = $('ul.side-menu h2.title').height();
var item_height = $('ul.side-menu li a').height();
// Untoggle menu on click outside of it
/*
$(document).mouseup(function (e) {
	var container = $('ul.side-menu');
	if ((!container.is(e.target) && container.has(e.target).length === 0) &&
		 (!($('a.menu-icon').is(e.target)) && $('a.menu-icon').has(e.target).length === 0)) {
		container.removeClass("in");
		$('body, ul.side-menu').removeClass("open");
		$('ul.side-menu li').css("top", "100%");
		$('ul.side-menu h2').css("top", "-60px");
	}
});
*/

//
//scroll
$(document).ready(function(){
	//chat bar toggle
  $("body").on('click',"a.menu-icon-chatbox",function(e) {
    e.preventDefault();
    var line1 = Snap("#line1");
    var line2 = Snap("#line2");
    var line3 = Snap(".line3");
    var line4 = Snap(".line4");

    var delay = 450;

    if($('#chatbar').hasClass('sidebarclosed')){
      line1.animate({y2:"50%"},delay,mina.easein);
      line2.animate({y2:"50%"},delay,mina.easein);
      line3.animate({x2:"95%"},delay,mina.easein);
      line4.animate({x2:"5%"},delay+200,mina.easein);
    }
    else{
      line1.animate({y2:"0%"},delay,mina.easein);
      line2.animate({y2:"100%"},delay,mina.easein);
      line3.animate({x2:"50%"},delay,mina.easein);
      line4.animate({x2:"50%"},delay+200,mina.easein);
    }
	  $('#chatbar').toggleClass('sidebarclosed');
  });


	var searchbardelay = 150;
	var searchbarease = mina.linear;
	//search bar focus
	$("body").on('focus',".searchbar",function(){
		$(this).attr("placeholder","");

		var lineleft = Snap(".linesearchbarleft");
		var lineright = Snap(".linesearchbarright");
		var linetop1 = Snap(".linesearchbartop1");
		var linetop2 = Snap(".linesearchbartop2");

		lineleft.animate({y2:"0"},searchbardelay,searchbarease,function(){
			linetop1.animate({x2:"50%"},searchbardelay,searchbarease);
		});
		lineright.animate({y2:"0"},searchbardelay,searchbarease,function(){
			linetop2.animate({x2:"50%"},searchbardelay,searchbarease);
		});

	});

	//search bar blur
	$("body").on('blur',".searchbar",function(){
		$(this).attr("placeholder","Search");

		var lineleft = Snap(".linesearchbarleft");
		var lineright = Snap(".linesearchbarright");
		var linetop1 = Snap(".linesearchbartop1");
		var linetop2 = Snap(".linesearchbartop2");

		linetop1.animate({x2:"10%"},searchbardelay,searchbarease,function(){
			lineleft.animate({y2:"100%"},searchbardelay,searchbarease);
		});

		linetop2.animate({x2:"90%"},searchbardelay,searchbarease,function(){
			lineright.animate({y2:"100%"},searchbardelay,searchbarease);
		});
	});

  //search
  $('body').on('keyup',".searchbar",function(){
    var search = $(this).val().toLowerCase(); //lowercased version

    if(search == ""){
      $(".chatcontact").fadeIn(200);
    }
    else{
      $(".chatcontact").each(function(){
        //get lowercase version for case insensitive searching
        var nameLowercase = $(this).data("firstname").toLowerCase();

        if(nameLowercase.lastIndexOf(search) != -1 && (nameLowercase[nameLowercase.lastIndexOf(search) - 1] == null || nameLowercase[nameLowercase.lastIndexOf(search) - 1] == ' ')){
          $(this).fadeIn(200);
        }
        else{
          $(this).fadeOut(100);
        }
      });
    }
  });

  //declare chat messages storage.
  var chatstorage = [];

  function openHTML(username,state,firstname){
    var color = state == "Online"?"green":"gray";

    var html = ''+
      '<div data-username="'+username+'" data-state="'+state+'" data-firstname="'+firstname+'" class="chatwindowopen">'+
        '<div class="chatbottom">'+
          '<input class="chatsend" type="text"/>'+
          '<svg style="width:100%;height:100%;position:absolute">'+
            '<line x1="0" y1="0" x2="100%" y2="0" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
            '<line x1="100%" y1="0" x2="100%" y2="100%" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
            '<line x1="0" y1="0" x2="0" y2="100%" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
            '<line x1="3%" y1="88%" x2="97%" y2="88%" style="stroke:rgba(255,255,255,0.5);stroke-width:1"></line>'+
          '</svg>'+
        '</div>'+
        '<div class="fly">'+
          '<div class="chathead"><a href="#" class="anchorfix open">'+
              '<svg style="width:100%;height:100%;position:absolute">'+
                '<line x1="0" y1="0" x2="100%" y2="0" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
                '<line x1="0" y1="0" x2="0" y2="100%" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
                '<line x1="100%" y1="0" x2="100%" y2="100%" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
                '<div class="col-lg-3 center chatwindowstatus"><span class="'+color+'">'+state+'</span></div>'+
                '<div class="col-lg-7 center chatwindowname"><span>'+firstname+'</span></div>'+
              '</svg></a>'+
            '<button type="button" aria-hidden="true" class="close center chatwindowbutton">&times;</button>'+
          '</div>'+
          '<div class="chatbody">'+
            '<svg style="width:100%;height:100%;position:absolute">'+
              '<line x1="0" y1="0" x2="100%" y2="0" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
              '<line x1="0" y1="0" x2="0" y2="100%" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
              '<line x1="100%" y1="0" x2="100%" y2="100%" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
              '<line x1="0" y1="100%" x2="100%" y2="100%" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
            '</svg>'+
            '<div class="chatmessages"></div>'+
          '</div>'+
        '</div>'+
      '</div>';

      return html;
  }

  function closeHTML(username,state,firstname){
    var color = state == "Online"?"green":"gray";

    var html = ''+
      '<div data-username="'+username+'" data-state="'+state+'" data-firstname="'+firstname+'" class="chatwindow"><a href="#" class="anchorfix closed">'+
        '<svg style="width:100%;height:100%;position:absolute">'+
          '<line x1="0" y1="0" x2="100%" y2="0" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
          '<line x1="0" y1="0" x2="0" y2="100%" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
          '<line x1="100%" y1="0" x2="100%" y2="100%" style="stroke:rgba(255,255,255,1);stroke-width:5"></line>'+
        '</svg>'+
        '<div class="col-lg-3 center chatwindowstatus"><span class="'+color+'">'+state+'</span></div>'+
        '<div class="col-lg-7 center chatwindowname"><span>'+firstname+'</span></div>'+
        '<div class="clearfix"></div></a>'+
      '<button type="button" aria-hidden="true" class="close center chatwindowbutton">&times;</button>'+
    '</div>';

    return html;
  }

  //onclick chat contact
  $('body').on('click',".chatcontact a",function(e){
    e.preventDefault();

    var username = $(this).closest(".chatcontact").data("username");

    if($(".chatwindow[data-username='"+username+"']").length > 0){
      $(".chatwindowopen[data-username='"+username+"']").show();
      $(".chatwindow[data-username='"+username+"']").hide();

      $(".chatwindowopen[data-username='"+username+"']").find('.chatmessages').scrollTop($(".chatwindowopen[data-username='"+username+"']").find('.chatmessages')[0].scrollHeight);
    }
    else{
      var state = $(this).find("span.right").text();

      var firstname = $(this).closest(".chatcontact").data("firstname");

      if($('.chatwindow[data-username="'+username+'"]').length == 0){
        $("#chatwindowcontainer").append("<div class='chatmainwindow'>"+openHTML(username,state,firstname)+closeHTML(username,state,firstname)+"</div>");
        $(".chatwindow[data-username='"+username+"']").hide();
      }


      //request for messages
      socket.emit("fetchchat",username);
    }
    $(".chatwindowopen[data-username='"+username+"']").find(".chatsend").focus();

    //remove search val and blur it
    $('.searchbar').val("");
    $('.searchbar').keyup();
  });

  //window toggle
  $('body').on('click','.closed',function(e){
    e.preventDefault();

    var username = $(this).closest(".chatwindow").data("username");

    $(".chatwindowopen[data-username='"+username+"']").show();
    $(".chatwindow[data-username='"+username+"']").hide();

    $(".chatwindowopen[data-username='"+username+"']").find('.chatmessages').scrollTop($(".chatwindowopen[data-username='"+username+"']").find('.chatmessages')[0].scrollHeight);
  });

  $('body').on('click','.open',function(e){
    e.preventDefault();

    var username = $(this).closest(".chatwindowopen").data("username");

    $(".chatwindowopen[data-username='"+username+"']").hide();
    $(".chatwindow[data-username='"+username+"']").show();
  });

  $('body').on('click','.unread',function(){
    $(this).removeClass("unread");
  });

  //close window
  $('body').on('click','.chatwindowbutton',function(){
    $(this).closest(".chatmainwindow").children().hide();
  });

  //socket listener
  socket.on("updatechat",function(html,data){
    $("#chatcontainer").html("");
    $("#chatcontainer").html(html);
    //set chatcontact tile height
    $('.chatcontact').css("height",$(".chatcontact").width()+"px");
    //remove user from chat
    $('.chatcontact[data-username="'+userkey+'"]').remove();

    for(var i = 0; i < data.online.length; i++){
      if($(".chatwindow[data-username='"+data.online[i].username+"']").length > 0){
        $(".chatwindow[data-username='"+data.online[i].username+"']").find(".chatwindowstatus span").removeClass("gray");
        $(".chatwindow[data-username='"+data.online[i].username+"']").find(".chatwindowstatus span").addClass("green");
        $(".chatwindow[data-username='"+data.online[i].username+"']").find(".chatwindowstatus span").text("Online");

        $(".chatwindowopen[data-username='"+data.online[i].username+"']").find(".chatwindowstatus span").removeClass("gray");
        $(".chatwindowopen[data-username='"+data.online[i].username+"']").find(".chatwindowstatus span").addClass("green");
        $(".chatwindowopen[data-username='"+data.online[i].username+"']").find(".chatwindowstatus span").text("Online");
      }
    }

    for(var i = 0; i < data.offline.length; i++){
      if($(".chatwindow[data-username='"+data.offline[i].username+"']").length > 0){
        $(".chatwindow[data-username='"+data.offline[i].username+"']").find(".chatwindowstatus span").removeClass("green");
        $(".chatwindow[data-username='"+data.offline[i].username+"']").find(".chatwindowstatus span").addClass("gray");
        $(".chatwindow[data-username='"+data.offline[i].username+"']").find(".chatwindowstatus span").text("Offline");

        $(".chatwindowopen[data-username='"+data.offline[i].username+"']").find(".chatwindowstatus span").removeClass("green");
        $(".chatwindowopen[data-username='"+data.offline[i].username+"']").find(".chatwindowstatus span").addClass("gray");
        $(".chatwindowopen[data-username='"+data.offline[i].username+"']").find(".chatwindowstatus span").text("Offline");
      }
    }
  });

  socket.on("fetchchat",function(name,log,lastIndex){
    if(!log){
      return;
    }

    log = safe_tags(log);

    if($(".chatwindowopen[data-username='"+name+"']").find(".chatmessages").children(".chatsection")[0]){
      var scrollTarget = $(".chatwindowopen[data-username='"+name+"']").find(".chatmessages").children(".chatsection").first();
    }
    else{
      var scrollTarget = false;
    }

    //check if username exists in chatstorage
    var usernameInChatStorage = false;
    for(var i = 0; i < chatstorage.length; i++){
      if(chatstorage[i]["username"] == name){
        usernameInChatStorage = true;
        var usernameIndex = i;
        break;
      }
    }

    if(!usernameInChatStorage){
      //push to chat append a new username object
      var push = {
        username: name,
        dates: []
      };

      chatstorage.push(push);

      var usernameIndex = chatstorage.length-1;
    }

    for(var i = 0; i < log.length; i++){
      if(chatstorage[usernameIndex]["dates"].lastIndexOf(log[i]["date"]) != -1){
        //remove date title
        $(".chatwindowopen[data-username='"+name+"']").find(".chatmessages").children()[0].remove();
      }
      else{
        //add date to chatstorage[usernameIndex]
        chatstorage[usernameIndex]["dates"].push(log[i]["date"]);
      }

      //date html
      var dateHTML = ''+
        '<div class="datetitle">'+
          '<strong>'+log[i]["date"]+'</strong>'+
        '</div>';

      var chatHTML = '';
      for(var j = 0; j < log[i]["messages"].length; j++){
        var sender = "";

        if(log[i]["messages"][j]["sender"] == name){
          sender = "chatother";
        }
        else{
          sender = "chatself";
        }

        var label = "";

        if(sender == "chatself"){
          label = "You";
        }
        else{
          label = $(".chatwindowopen[data-username='"+name+"']").data("firstname");
        }

        var chat = ''+
        '<div class="chatsection '+sender+'">'+
          '<span><strong>'+label+': </strong>'+log[i]["messages"][j]["message"]+'</span>'+
        '</div>';

        chatHTML = chat + chatHTML;
      }

      var finalHTML = dateHTML + chatHTML;

      //prepend to .chatbody
      $(".chatwindowopen[data-username='"+name+"']").find(".chatmessages").prepend(finalHTML);
    }

    //adjust scroll
    if(scrollTarget){
      $(".chatwindowopen[data-username='"+name+"']").find('.chatmessages').scrollTop(scrollTarget.prev().position()["top"]);
    }
    else{
      $(".chatwindowopen[data-username='"+name+"']").find('.chatmessages').scrollTop($(".chatwindowopen[data-username='"+name+"']").find('.chatmessages')[0].scrollHeight);
    }


    //bind scroll listener
    $(".chatwindowopen[data-username='"+name+"']").find('.chatmessages').bindScroll(name);

    //insertlastIndex
    chatstorage[usernameIndex]["lastId"] = lastIndex;
  });

  socket.on('sendchat',function(sender,recipient,msg,date){
    msg = safe_tags(msg);

    //find partner
    if(userkey == recipient){
      var opposite = sender;
    }
    else{
      var opposite = recipient;
    }

    //check if username exists in chatstorage
    var usernameInChatStorage = false;
    for(var i = 0; i < chatstorage.length; i++){
      if(chatstorage[i]["username"] == opposite){
        usernameInChatStorage = true;
        var usernameIndex = i;
        break;
      }
    }

    if(usernameInChatStorage){
      if(chatstorage[usernameIndex]["dates"].indexOf(date) == -1){
        chatstorage[usernameIndex]["dates"].push(date);
        //insert date title here
        var dateHTML = ''+
          '<div class="datetitle">'+
            '<strong>'+date+'</strong>'+
          '</div>';

        $(".chatwindowopen[data-username='"+opposite+"']").find('.chatmessages').append(dateHTML);



      }
    }
    else{
      //push to chat append a new username object
      var push = {
        username: name,
        dates: []
      };

      chatstorage.push(push);

      var usernameIndex = chatstorage.length-1;

      //should fetch shit here
      if(userkey == recipient){
        var state = $('.chatcontact[data-username="'+opposite+'"]').find("span.right").text();
        var firstname = $('.chatcontact[data-username="'+opposite+'"]').data("firstname");
        if($('.chatmainwindow').find('.chatwindow[data-username="'+opposite+'"]').length == 0){
          $("#chatwindowcontainer").append("<div class='chatmainwindow'>"+openHTML(opposite,state,firstname)+closeHTML(opposite,state,firstname)+"</div>");
        }

        socket.emit("fetchchat",opposite,null,true);
      }
    }

    //append html to chatmessages
    var senderClass = "";

    if(sender != userkey){
      senderClass = "chatother";
    }
    else{
      senderClass = "chatself";
    }

    var label = "";

    if(senderClass == "chatself"){
      label = "You";
    }
    else{
      label = $(".chatwindowopen[data-username='"+opposite+"']").data("firstname");
    }

    var chat = ''+
    '<div class="chatsection '+senderClass+'">'+
      '<span><strong>'+label+': </strong>'+msg+'</span>'+
    '</div>';

    $(".chatwindowopen[data-username='"+opposite+"']").find('.chatmessages').append(chat);

    $(".chatwindowopen[data-username='"+opposite+"']").show();
    $(".chatwindow[data-username='"+opposite+"']").hide();

    //scroll down
    if($(".chatwindowopen[data-username='"+opposite+"']").find('.chatmessages')[0]){
      $(".chatwindowopen[data-username='"+opposite+"']").find('.chatmessages').scrollTop($(".chatwindowopen[data-username='"+opposite+"']").find('.chatmessages')[0].scrollHeight);
    }
  });

  $('body').on('keyup','.chatsend',function(e){
    if(e.keyCode == 13){
      //check if it has value
      if($(this).val() != ""){
        //emit socket event

        socket.emit('sendchat',$(this).closest(".chatwindowopen").data("username"),$(this).val());

        //clear val
        $(this).val("");
      }
    }
  });

  $.fn.bindScroll = function(name){
    $(this).off('scroll');
    $(this).on('scroll', function(){
      var scrollTop = $(this).scrollTop();
      if(scrollTop == 0){
        //select object with relevant username
        var lastId;
        for(var i = 0; i < chatstorage.length; i++){
          if(chatstorage[i].username == name){
            lastId = chatstorage[i].lastId;
            break;
          }
        }
        socket.emit("fetchchat",name,lastId);
      }
    });
  }
});

$(function(){
	$('a').tooltip();

	$('body').tooltip({
		delay: { show: 300, hide: 0 },
		placement: function(tip, element) { //$this is implicit
				var position = $(element).position();
				if (position.left > 515) {
						return "left";
				}
				if (position.left < 515) {
						return "right";
				}
				if (position.top < 110){
						return "bottom";
				}
					return "top";
			},selector: '[rel=tooltip]:not([disabled])'
	});
 });
