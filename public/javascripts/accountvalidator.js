$(document).ready(function(){
		$.ajax({
			url: "http://localhost:8080/getPendingAccounts",
			type: "GET",
			success: function(res){
					if(res == "None"){
							$("#temp").append("No pending accounts"); //generate cool html for this
					}
					else{
						for(var i = 0; i < res.length; i++){
							var li = ''+
								'<table class="table table-condensed table-hover">';
							var mentee_mentor = '';
							var img = '';
							for(data in res[i]){
								if(data == "mentee"){
									var counter = 0;
									var temphtml = '';
									for(var j = 0; j < res[i]["mentee"].length; j++){
										if(counter == 0){
											var temphtml2 = ''+
												'<tr data-mentee>'+
													'<td>'+
														'Mentees'+
													'</td>'+
													'<td>'+res[i]["mentee"][j]+'</td>'+
													'<td>'+'<a class="mentee">Edit</a>'+'</td>'+
												'</tr>';
											counter += 1;
										} else{
											var temphtml2 = ''+
												'<tr data-mentee>'+
													'<td>'+
													'</td>'+
													'<td>'+res[i]["mentee"][j]+'</td>'+
													'<td>'+'<a class="mentee">Edit</a>'+'</td>'+
												'</tr>';
										}
										temphtml = temphtml.concat(temphtml2);
									}
									mentee_mentor = mentee_mentor.concat(temphtml);
								}
								else if(data == "mentor"){
									var temphtml = ''+
										'<tr data-'+'mentor'+'>'+
											'<td>'+'Mentor'+'</td>'+
											'<td>'+res[i]['mentor']+'</td>'+
											'<td>'+'<a>Edit</a>'+'</td>'+
										'</tr>';
									mentee_mentor = mentee_mentor.concat(temphtml);
								}
								else if(data == "username"){
									var temphtml = ''+
										'<tr data-'+'username'+'>'+
											'<td>'+'Username'+'</td>'+
											'<td>'+res[i]['username']+'</td>'+
											'<td>'+'<a>Edit</a>'+'</td>'+
										'</tr>';
									mentee_mentor = mentee_mentor.concat(temphtml);
								}
								else if(data == "department"){
									var temphtml = ''+
										'<tr data-'+'department'+'>'+
											'<td>'+'Department'+'</td>'+
											'<td>'+res[i]['department']+'</td>'+
											'<td>'+'<a>Edit</a>'+'</td>'+
										'</tr>';
									mentee_mentor = mentee_mentor.concat(temphtml);
								}
								else if(data == "org_batch"){
									var temphtml = ''+
										'<tr data-'+'org_batch'+'>'+
											'<td>'+'Organization Batch'+'</td>'+
											'<td>'+res[i]['org_batch']+'</td>'+
											'<td>'+'<a>Edit</a>'+'</td>'+
										'</tr>';
									mentee_mentor = mentee_mentor.concat(temphtml);
								}
								else if(data == "org_class"){
									var temphtml = ''+
										'<tr data-'+'org_class'+'>'+
											'<td>'+'Organization Classification'+'</td>'+
											'<td>'+res[i]['org_class']+'</td>'+
											'<td>'+'<a>Edit</a>'+'</td>'+
										'</tr>';
									mentee_mentor = mentee_mentor.concat(temphtml);
								}
								else if(data == "exec_position"){
									var temphtml = ''+
										'<tr data-'+'exec-position'+'>'+
											'<td>'+'Executive Position'+'</td>'+
											'<td>'+res[i]['exec_position']+'</td>'+
											'<td>'+'<a>Edit</a>'+'</td>'+
										'</tr>';
									mentee_mentor = '<table class="table table-condensed table-hover">' + temphtml + mentee_mentor;
								}
								else if(data == "picture"){
									var temphtml = ''+
										'<div data-'+data+' class="account-image">'+
											'<img src="http://localhost:8080/'+res[i]["picture"]+'"/>'+
										'</div>';
									img = img.concat(temphtml);
								}
								else{
									var tempData;

									if(data == 'username') tempData = 'Username';
									else if(data == 'first_name') tempData = 'First Name';
									else if(data == 'middle_name') tempData = 'Middle Name';
									else if(data == 'last_name') tempData = 'Last Name';
									else if(data == 'org_class') tempData = 'Organization Classification';
									else if(data == 'department') tempData = 'Department';
									else if(data == 'student_number') tempData = 'Student Number';
									else if(data == 'org_batch') tempData = 'Organization Batch';
									else if(data == 'univ_batch') tempData = 'University Batch';
									else if(data == 'mentor') tempData = 'Mentor';
									else if(data == 'birthday') tempData = 'Birthday';
									else if(data == 'home_address') tempData = 'Home Adress';
									else if(data == 'college_address') tempData = 'College Adress';
									else if(data == 'exec_position') tempData = 'Executive Position';
									else tempData = ' ';

									var temphtml = ''+
										'<tr data-'+data+'>'+
											'<td>'+tempData+'</td>'+
											'<td>'+res[i][data]+'</td>'+
											'<td>'+'<a>Edit</a>'+'</td>'+
										'</tr>';
									li = li.concat(temphtml);
								}
							}
							var html = ''+
								'<div class="to-validate" data-username='+res[i]["username"]+'>'+
									img+
									'<div class="account-data">'+
										li+'</table>'+
										mentee_mentor+'</table>'+
									'</div>'+
									'<button class="accept">Accept</button>'+
									'<button class="edit">Edit</button>'+
									'<button class="reject">Reject</button>'+
								'</div>';
							$("#temp").append(html);
					}
				}
			},
			error: function (e){
				console.dir(e);
			}
		});

		$("body").on("click",".accept",function(){
			//check if there are input boxes
			if($(this).parent().find("input").length > 0){
				$(this).parent().find("input").each(function(index){
					var temphtml = $(this).val();
					$(this).parent().html(temphtml);
				});
			}

      button = $(this);
      //get mentees
      var mentee = [];
      $(this).parent().find($("li[data-mentee]")).each(function(index){
        mentee.push($(this).html());
      });
      mentee = JSON.stringify(mentee);
      $.ajax({
  			url: "http://localhost:8080/acceptAccount",
        data: {origusername:$(this).parent().data("username"),
               username:$(this).parent().find("li[data-username]").html(),
               first_name:$(this).parent().find("li[data-first_name]").html(),
               middle_name:$(this).parent().find("li[data-middle_name]").html(),
               last_name:$(this).parent().find("li[data-last_name]").html(),
               org_class:$(this).parent().find("li[data-org_class]").html(),
               department:$(this).parent().find("li[data-department]").html(),
               studentNumber:$(this).parent().find("li[data-student_number]").html(),
               org_batch:$(this).parent().find("li[data-org_batch]").html(),
               univ_batch:$(this).parent().find("li[data-univ_batch]").html(),
               mentor:$(this).parent().find("li[data-mentor]").html(),
               mentee:mentee,
               bday:$(this).parent().find("li[data-birthday]").html(),
               homeAdd:$(this).parent().find("li[data-home_address]").html(),
               collegeAdd:$(this).parent().find("li[data-college_address]").html(),
               picture:$(this).parent().find("li[data-picture]").html(),
               exec_position:$(this).parent().find("li[data-exec_position]").html()},
				type: "POST",
				success: function(res){
					var temphtml = ''+
						'<ul>'+
							'<li>'+
								'Account '+button.parent().data("username")+' accepted.'+
							'</li>'+
						'</ul>';
					button.parent().html(temphtml);
				},
				error: function (e){
					console.dir(e);
				}
			});
		});
		$("body").on("click",".reject",function(){
			//check if there are input boxes
			if($(this).parent().find("input").length > 0){
				$(this).parent().find("input").each(function(index){
					var temphtml = $(this).val();
					$(this).parent().html(temphtml);
				});
			}

			button = $(this);
			$.ajax({
				url: "http://localhost:8080/rejectAccount",
				data: {origusername:$(this).parent().data("username"),
							 picture:$(this).parent().find("li[data-picture]").html()},
				type: "POST",
				success: function (res){
					var temphtml = ''+
						'<ul>'+
							'<li>'+
								'Account '+button.parent().data("username")+' rejected.'+
							'</li>'+
						'</ul>';
					button.parent().html(temphtml);
				},
				error: function (e){
					console.log(e);
				}
			});
		});
		$("body").on("click",".edit",function(){
			if($(this).parent().find("input").length > 0){
				alert("There are boxes");
			}
			else{
				$(this).parent().find("ul").find("li").each(function(index){
					var temphtml = ''+
						'<input type="text" value="'+$(this).html()+'">';
					$(this).html(temphtml);
				});
			}
		});
});
