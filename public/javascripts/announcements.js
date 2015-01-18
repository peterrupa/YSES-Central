$(document).ready(function(){

	$("body").on("click",".hoverClose",function(){
		$(this).parent().parent().slideUp();
	});

	var announcementIndex = 0; //number of current announcements displayed. initialized at zero

	//fetch announcements function
	function fetchAnnouncements(index){
		$.ajax({
			url: "http://localhost:8080/getAnnouncements",
			data: "count="+index,
			type: "GET",
			success: function(res){
					res = safe_tags(res);

					for(var i = 0; i < res.length; i++){
						var postClass;
						switch(res[i]["department"]){
							case "Senior Projects and Activities": postClass = "PAD";
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

						var temphtml = ''+
							'<li>'+
								'<div class="post post-'+postClass+'">'+
									'<button type="button" aria-hidden="true" class="close hoverClose">&times;</button>'+
									'<div class="row">'+
										'<h3 class="title">'+
											res[i]["title"]+
										'</h3>'+
									'</div>'+
									'<p class="op">'+res[i]["department"]+' Department</p>'+
									'<p class="date">'+res[i]["date"]+'</p>'+
									'<div class="row">'+
										'<p>'+res[i]["message"]+'</p>'+
									'</div>'+
								'</div>'+
							'</li>';
						$("#announcements").append(temphtml);
					}
					if(announcementIndex == 0){
						var temphtml = ''+
							'<a class="announcementsViewMore" href="#">'+
								'<p class="text-center">View more</p>'
							'</a>';
						$("#announcements").after(temphtml);
					}
					announcementIndex += res.length;

				if(res.length < 5){
					var temphtml = ''+
						'<p class="text-center">No more announcements.</p>';
					$("#announcements").append(temphtml);
					$(".announcementsViewMore").remove();
				}
			},
			error: function (e){
				console.dir(e);
			}
		});
	}

	//invoke on document ready
	fetchAnnouncements(0);

	//remove already existing listener
	$("body").off('click','.announcementsViewMore');

	$("body").on('click','.announcementsViewMore',function(e){
		e.preventDefault();
		fetchAnnouncements(announcementIndex);
	});

	function checkVisible( elm, evalType ) { //from stackoverflow, not mine!
    evalType = evalType || "visible";

    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    if (evalType === "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
    if (evalType === "above") return ((y < (vpH + st)));
	}

	$(window).off('scroll');
	$(window).on('scroll',function(){
		if($('.announcementsViewMore').length > 0){
			if(checkVisible($('.announcementsViewMore'))){
				fetchAnnouncements(announcementIndex);
			}
		}
	});

	socket.off('announcementpost');
	socket.on('announcementpost',function(post){
		var postClass;
		switch(post["department"]){
			case "Senior Projects and Activities": postClass = "PAD";
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

		var temphtml = ''+
			'<li>'+
				'<div class="post post-'+postClass+'">'+
					'<button type="button" aria-hidden="true" class="close hoverClose">&times;</button>'+
					'<div class="row">'+
						'<h3 class="title">'+
							post["title"]+
						'</h3>'+
					'</div>'+
					'<p class="op">'+post["department"]+' Department</p>'+
					'<p class="date">'+post["date"]+'</p>'+
					'<div class="row">'+
						'<p>'+post["message"]+'</p>'+
					'</div>'+
				'</div>'+
			'</li>';
		$("#announcements").prepend(temphtml);
		announcementIndex++;
	});

});
