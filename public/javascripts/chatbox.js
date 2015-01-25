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
	//$("ul.side-menu").niceScroll().hide();

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

  //onclick chat contact
  $('body').on('click',".chatcontact a",function(e){
    e.preventDefault();
    alert("HI");
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
        var nameLowercase = $(this).data("name").toLowerCase();

        if(nameLowercase.lastIndexOf(search) != -1 && (nameLowercase[nameLowercase.lastIndexOf(search) - 1] == null || nameLowercase[nameLowercase.lastIndexOf(search) - 1] == ' ')){
          $(this).fadeIn(200);
        }
        else{
          $(this).fadeOut(100);
        }
      });
    }
  });

  //socket listener
  socket.on("updatechat",function(data){
    $("#chatcontainer").html("");
    $("#chatcontainer").html(data);
    //set chatcontact tile height
    $('.chatcontact').css("height",$(".chatcontact").width()+"px");
  });
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
