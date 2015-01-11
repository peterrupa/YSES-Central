$(document).ready(function(){
  var announcementIndex2 = 0 //number of current announcements displayed. initialized at zero

	//fetch announcements function
	function fetchAnnouncements(index){
		$.ajax({
			url: "http://localhost:8080/getAnnouncements",
			data: "count="+index,
			type: "GET",
			success: function(res){
					for(var i = 0; i < res.length; i++){
						var postClass;
						switch(res[i]["department"]){
							case "Projects and Activities": postClass = "PAD";
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

            for(data in res[i]){
              res[i][data] = safe_tags(res[i][data]);
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
					if(announcementIndex2 == 0){
						var temphtml = ''+
							'<a class="announcementsViewMore2" href="#">'+
								'<p class="text-center">View more</p>'
							'</a>';
						$("#announcements").after(temphtml);
					}
					announcementIndex2 += res.length;

				if(res.length < 5){
					var temphtml = ''+
						'<p class="text-center">No more announcements.</p>';
					$("#announcements").append(temphtml);
					$(".announcementsViewMore2").remove();
				}
			},
			error: function (e){
				console.dir(e);
			}
		});
	}

	//invoke on document ready
	fetchAnnouncements(0);

  $("body").on('click','.announcementsViewMore2',function(e){
		e.preventDefault();
		fetchAnnouncements(announcementIndex2);
	});

  $("#submit").on('click',function(){
    //insert validation here
    $.ajax({
			url: "http://localhost:8080/postAnnouncements",
			data: {title:$("#title").val(),message:$("#message").val()},
			type: "POST",
			success: function(res){
        var postClass;
        switch(res["department"]){
          case "Projects and Activities": postClass = "PAD";
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

        for(data in res){
          res[data] = safe_tags(res[data]);
        }
        
        var temphtml = ''+
          '<li>'+
            '<div class="post post-'+postClass+'">'+
              '<button type="button" aria-hidden="true" class="close hoverClose">&times;</button>'+
              '<div class="row">'+
                '<h3 class="title">'+
                  res["title"]+
                '</h3>'+
              '</div>'+
              '<p class="op">'+res["department"]+' Department</p>'+
              '<p class="date">'+res["date"]+'</p>'+
              '<div class="row">'+
                '<p>'+res["message"]+'</p>'+
              '</div>'+
            '</div>'+
          '</li>';
        $(temphtml).prependTo("#announcements");
        announcementIndex2++;
      },
      error: function (e){
				console.dir(e);
			}
    });
  });

});
