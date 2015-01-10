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

						for(data in res[i]){ //cleans all html elements
							res[i][data] = safe_tags(res[i][data]);
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

	//remove already existing listener
	$("body").off('click','.logbookViewMore');

	$("body").on('click','.logbookViewMore',function(e){
		e.preventDefault();
		fetchLogbook(logbookIndex);
	});

});
