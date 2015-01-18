$(document).ready(function(){
  //fetch logbook entries

  logbookIndex = 0 //number of current logbook entries displayed. initialized at zero

	//fetch logbook function
	function fetchLogbook(index){
		$.ajax({
			url: "http://localhost:8080/getLogbook",
			data: "count="+index,
			type: "GET",
			success: function(res){
          res = safe_tags(res); //cleans all html elements

					for(var i = 0; i < res.length; i++){
						var postClass;
						switch(res[i]["department"]){
							case "Senior Projects and Activities": postClass = "PAD";
										break;
            				case "Junior Projects and Activities": postClass = "JPAD";
										break;
							case "Visuals and Logistics": postClass = "VL";
										break;
							case "Human Resources": postClass = "HR";
										break;
							case "Finance": postClass = "Fin";
										break;
							case "Scholastics": postClass = "Scho";
										break;
							case "Secretariat": postClass = "Sec";
										break;
							case "Executive": postClass = "Exec";
										break;
						}

            //convert newline to breaks
            res[i]["message"] = res[i]["message"].replace(/\n/g,"<br>");
						var temphtml = ''+
							'<li>'+
                '<div class="post post-'+postClass+'">'+
                  '<button class="close hoverClose" type="button" aria-hidden="true">&times;</button>'+
                  '<div class="row">'+
                    '<a href="http://localhost:8080/profile/'+res[i]["username"]+'"><img class="mini-pic" src="'+res[i]["picture"]+'"></a>'+
                    '<h3 class="title"><a href="http://localhost:8080/profile/'+res[i]["username"]+'">'+res[i]["first_name"]+'</a></h3>'+
                    '<p class="date">'+res[i]["date"]+'</p>'+
                  '</div>'+
                  '<div class"row">'+
                    '<p>'+res[i]["message"]+'</p>';
                  '</div>'+
                '</div>'+
              '</li>';
						$("#logbook").append(temphtml);
					}
					if(logbookIndex == 0){
						var temphtml = ''+
							'<a class="logbookViewMore" href="#">'+
								'<p class="text-center">View more</p>'
							'</a>';
						$("#logbook").after(temphtml);
					}
					logbookIndex += res.length;

				if(res.length < 10){
					var temphtml = ''+
						'<p class="text-center">No more entries.</p>';
					$("#logbook").append(temphtml);
					$(".logbookViewMore").remove();
				}
			},
			error: function (e){
				console.dir(e);
			}
		});
	}

	//invoke on document ready
	fetchLogbook(0);

  function checkVisible( elm, evalType ) { //from stackoverflow, not mine!
    evalType = evalType || "visible";

    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    if (evalType === "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
    if (evalType === "above") return ((y < (vpH + st)));
	}

  //auto update on scroll
	$(window).on('scroll',function(){
		if($('.logbookViewMore').length > 0){
			if(checkVisible($('.logbookViewMore'))){
				fetchLogbook(logbookIndex);
			}
		}
	});

	//remove already existing listener
	$("body").off('click','.logbookViewMore');

	$("body").on('click','.logbookViewMore',function(e){
		e.preventDefault();
		fetchLogbook(logbookIndex);
	});

  //socket listener for new logbook posts
  socket.off('newlogbookpost');
  socket.on('newlogbookpost',function(post){
    var postClass;
    switch(post["department"]){
      case "Senior Projects and Activities": postClass = "PAD";
            break;
      case "Junior Projects and Activities": postClass = "JPAD";
            break;
      case "Visuals and Logistics": postClass = "VL";
            break;
      case "Human Resources": postClass = "HR";
            break;
      case "Finance": postClass = "Fin";
            break;
      case "Scholastics": postClass = "Scho";
            break;
      case "Secretariat": postClass = "Sec";
            break;
      case "Executive": postClass = "Exec";
            break;
    }

    post = safe_tags(post);

    //convert newline to breaks
    paragraph = post["message"].replace(/\n/g,"<br>");
    var temphtml = ''+
      '<li>'+
        '<div style="display:none;" class="newPost post post-'+postClass+'">'+
          '<button class="close hoverClose" type="button" aria-hidden="true">&times;</button>'+
          '<div class="row">'+
            '<a href="http://localhost:8080/profile/'+post["username"]+'"><img class="mini-pic" src="'+post["picture"]+'"></a>'+
            '<h3 class="title"><a href="http://localhost:8080/profile/'+post["username"]+'">'+post["first_name"]+'</a></h3>'+
            '<p class="date">'+post["date"]+'</p>'+
          '</div>'+
          '<div class"row">'+
            '<p>'+paragraph+'</p>'+
          '</div>'+
        '</div>'+
      '</li>';
    $("#logbook").prepend(temphtml);
    $('.newPost').slideDown('400');
	$(".newPost").removeClass('newPost');

    logbookIndex++;
  });

});
