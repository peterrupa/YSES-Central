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
							var table_data_2 = ''+
								'<table class="table table-condensed table-hover">';
							var table_data_1 = '';
							var img = '';
							for(data in res[i]){
								var tempData;

								switch(data){
									case 'username': 		tempData = 'Username'; break;
									case 'first_name': 		tempData = 'First Name'; break;
									case 'middle_name':  	tempData = 'Middle Name'; break;
									case 'last_name': 		tempData = 'Last Name'; break;
									case 'org_class': 		tempData = 'Organization Classification'; break;
									case 'department': 		tempData = 'Department'; break;
									case 'student_number': 	tempData = 'Student Number'; break;
									case 'org_batch': 		tempData = 'Organization Batch'; break;
									case 'univ_batch': 		tempData = 'University Batch'; break;
									case 'mentor': 			tempData = 'Mentor'; break;
									case 'birthday': 		tempData = 'Birthday'; break;
									case 'home_address': 	tempData = 'Home Adress'; break;
									case 'college_address': tempData = 'College Adress'; break;
									case 'exec_position': 	tempData = 'Executive Position'; break;
									default: 				tempData = ' '; break;
								}

								if(data == "mentee"){
									var counter = 0;
									var temphtml = '';
									for(var j = 0; j < res[i]["mentee"].length; j++){
										if(counter == 0){
											var temphtml2 = ''+
												'<tr class="text" data-mentee="'+res[i]["mentee"][j]+'">'+
													'<td>'+
														'Mentees'+
													'</td>'+
													'<td>'+res[i]["mentee"][j]+'</td>'+
													'<td>'+'<a class="edit">Edit</a>'+'</td>'+
												'</tr>';
											counter += 1;
										} else{
											var temphtml2 = ''+
												'<tr class="text" data-mentee="'+res[i]["mentee"][j]+'">'+
													'<td>'+
													'</td>'+
													'<td>'+res[i]["mentee"][j]+'</td>'+
													'<td>'+'<a class="edit">Edit</a>'+'</td>'+
												'</tr>';
										}
										temphtml = temphtml.concat(temphtml2);
									}
									table_data_1 = table_data_1.concat(temphtml);
								}
								else if(data == "mentor" 
									|| data == "username" 
									|| data == "department" 
									|| data == "org_batch"
									|| data == "org_class"
									|| data == "exec_position"
									|| data == "picture"
								){
									
									if(data == "exec_position"){
										var position;

										if(res[i]['exec_position'] == null) position = 'Not an Executive Department Member';
										else position = res[i]['exec_position'];

										var temphtml = ''+
											'<tr class="position" data-'+'exec-position'+'="'+res[i]['exec_position']+'">'+
												'<td>'+'Executive Position'+'</td>'+
												'<td>'+position+'</td>'+
												'<td>'+'<a class="edit">Edit</a>'+'</td>'+
											'</tr>';
										table_data_1 = '<table class="table table-condensed table-hover">' + temphtml + table_data_1;
									} else if(data == "picture"){
										var temphtml = ''+
											'<div data-'+data+'="'+res[i]["picture"]+'" class="account-image">'+
												'<img src="http://localhost:8080/'+res[i]["picture"]+'"/>'+
											'</div>';
										img = img.concat(temphtml);
									} else{
										var data_class;

										switch(data){
											case "department": 	data_class = 'department'; break;
											case "org_batch": 	data_class = 'org_batch'; break;
											case "org_class": 	data_class = 'org_class'; break;
											default: 			data_class = 'text'; break;
										}

										var temphtml = ''+
											'<tr class="'+data_class+'" data-'+data+'="'+res[i][data]+'">'+
												'<td>'+tempData+'</td>'+
												'<td>'+res[i][data]+'</td>'+
												'<td>'+'<a class="edit">Edit</a>'+'</td>'+
											'</tr>';
										table_data_1 = table_data_1.concat(temphtml);
									}
								}
								else{
									var data_class;

									switch(data){
										case "student_number": 	data_class = 'studentnumber'; break;
										case "birthday": 		data_class = 'birthdate'; break;
										default: 				data_class = 'text'; break;
									}

									var temphtml = ''+
										'<tr class="'+data_class+'" data-'+data+'="'+res[i][data]+'">'+
											'<td>'+tempData+'</td>'+
											'<td>'+res[i][data]+'</td>'+
											'<td>'+'<a class="edit">Edit</a>'+'</td>'+
										'</tr>';
									table_data_2 = table_data_2.concat(temphtml);
								}
							}
							var html = ''+
								'<div class="to-validate">'+
									img+
									'<h3 style="float:left;font-weight:bold;padding-top:0px">'+res[i]['first_name']+' '+res[i]['last_name']+'</h3>'+
									'<span style="float:left;padding-top:29px;margin-left:10px;">'+res[i]['department']+' Department'+'</span>'+
									'<div class="account-data">'+
										table_data_2+'</table>'+
										table_data_1+'</table>'+
									'</div>'+
									'<div class="to-validate-button">'+
										'<button class="pull-down accept">ACCEPT</button>'+
										'<button class="pull-down reject">REJECT</button>'+
									'</div>'+
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
			
			var data = $(this).closest("tr").find("td").first().next();

			// will convert data to text box
			if($(this).parent().find("input").length > 0){
				alert("There are boxes");
			}
			else if($(this).closest('tr').hasClass('text')){
				$(this).html('Done');
				$(this).addClass('done');
				$(this).removeClass('edit');

				data.each(function(index){
					var temphtml = ''+
						'<input type="text" value="'+$(this).html()+'">';
					$(this).html(temphtml);
				});
				$('input').on('keypress', function(e) {
					var code = e.keyCode || e.which;
					var temphtml = ''+
						$(this).val();
					if(code==13){
						$(this).closest("tr").find(".done").html('Edit');
						$(this).closest("tr").find(".done").addClass('edit');
						$(this).closest("tr").find(".done").removeClass('done');
						data.html(temphtml);
					}
				});
			}

			// will convert data to a datepicker
			else if($(this).closest('tr').hasClass('birthdate')){
				$(this).html('Done');
				$(this).addClass('done');
				$(this).removeClass('edit');

				data.each(function(index){
					var temphtml = ''+
						'<input style="width:130px;height:20px;" type="date" value="'+$(this).html()+'">';
					$(this).html(temphtml);
				});
				$('input').on('keypress', function(e) {
					var code = e.keyCode || e.which;
					var temphtml = ''+
						$(this).val();
					if(code==13){
						$(this).closest("tr").find(".done").html('Edit');
						$(this).closest("tr").find(".done").addClass('edit');
						$(this).closest("tr").find(".done").removeClass('done');
						data.html(temphtml);
					}
				});
			}

			// will convert data to a dropdown select [org_class]
			else if($(this).closest('tr').hasClass('org_class')){
				$(this).html('Done');
				$(this).addClass('done');
				$(this).removeClass('edit');

				data.each(function(index){
					var temphtml = ''+
						'<select id="org_class_select" name="org-class">'+
							'<option value="Active" >Active</option>'+
							'<option value="Inactive">Inactive</option>'+
							'<option value="Alumni">Alumni</option>'+
						'</select>';
					$(this).html(temphtml);
				});
			}

			// will convert data to a dropdown select [org_batch]
			else if($(this).closest('tr').hasClass('org_batch')){
				$(this).html('Done');
				$(this).addClass('done');
				$(this).removeClass('edit');

				data.each(function(index){
					var temphtml = ''+
						'<select id="org_batch_select" name="org-batch">'+
							'<option value="Charter" >Charter</option>'+
							'<option value="Synergy">Synergy</option>'+
							'<option value="RAMpage">RAMpage</option>'+
						'</select>';
					$(this).html(temphtml);
				});
			}

			// will convert data to a dropdown select [department]
			else if($(this).closest('tr').hasClass('department')){
				$(this).html('Done');
				$(this).addClass('done');
				$(this).removeClass('edit');

				data.each(function(index){
					var temphtml = ''+
						'<select id="department_select" name="department">'+
							'<optgroup label="Projects and Activities">'+
								'<option value="Junior Projects and Activities">Junior</option>'+
								'<option value="Senior Projects and Activities">Senior</option>'+
							'</optgroup>'+
							'<option value="Visuals and Logistics">Visuals and Logistics</option>'+
							'<option value="Secretariat">Secretariat</option>'+
							'<option value="Scholastics">Scholastics</option>'+
							'<option value="Finance">Finance</option>'+
							'<option value="Human Resources">Human Resources</option>'+
							'<option value="Executive">Executive (EO Only)</option>'+
						'</select>';
					$(this).html(temphtml);
				});
			}

			// will convert data to a dropdown select [position]
			else if($(this).closest('tr').hasClass('position')){
				$(this).html('Done');
				$(this).addClass('done');
				$(this).removeClass('edit');

				data.each(function(index){
					var temphtml = ''+
						'<select  id="position_select"name="position">'+
							'<option value="Deputy Executive Officer">Deputy Executive Officer</option>'+
							'<option value="Liaison Officer">Liaison Officer</option>'+
							'<option value="Visuals and Logistics Department Head">Visuals and Logistics Department Head</option>'+
							'<option value="Executive Assistant">Executive Assistant</option>'+
							'<option value="Scholastics Department Head">Scholastics Department Head</option>'+
							'<option value="Finance Department Head">Finance Department Head</option>'+
							'<option value="Human Resources Department Human">Human Resources Department Head</option>'+
							'<option value="Executive Officer">Executive Officer</option>'+
						'</select>';
					$(this).html(temphtml);
				});
			}

			// will convert data to a dropdown select [position]
			else if($(this).closest('tr').hasClass('studentnumber')){
				$(this).html('Done');
				$(this).addClass('done');
				$(this).removeClass('edit');

				data.each(function(index){
					var temphtml = ''+
						'<input style="width:70px;" type="text" id="stud_year">'+
						'<span> - </span>'+
						'<input style="width:70px;" type="text" id="stud_number">';
					$(this).html(temphtml);
				}); 
			}

		});

		$('body').on('click','.done', function(){

			var text = $(this).closest("tr");
			var data = text.find("td").first().next();
			var traversed = function(class_name){
				return text.hasClass(class_name);
			}

			// will convert data to a dropdown select [position]
			if(traversed('text')){

				data.each(function(index){
					var temphtml = ''+
						text.find('input').val();
					$(this).html(temphtml);
				});

				$(this).html('Edit');
				$(this).addClass('edit');
				$(this).removeClass('done');
			
			}
			else if(traversed('birthdate')){

				data.each(function(index){
					var temphtml = ''+
						text.find('input').val();
					$(this).html(temphtml);
				});

				$(this).html('Edit');
				$(this).addClass('edit');
				$(this).removeClass('done');
			
			}
			else if(traversed('org_class')){

				data.each(function(index){
					var temphtml = ''+
						text.find('#org_class_select').val();
					$(this).html(temphtml);
				});

				$(this).html('Edit');
				$(this).addClass('edit');
				$(this).removeClass('done');
			
			}

			else if(traversed('org_batch')){
				
				data.each(function(index){
					var temphtml = ''+
						text.find('#org_batch_select').val();
					$(this).html(temphtml);
				});

				$(this).html('Edit');
				$(this).addClass('edit');
				$(this).removeClass('done');

			}

			else if(traversed('department')){
				
				data.each(function(index){
					var temphtml = ''+
						text.find('#department_select').val();
					$(this).html(temphtml);
				});

				$(this).html('Edit');
				$(this).addClass('edit');
				$(this).removeClass('done');

			}

			else if(traversed('position')){
				
				data.each(function(index){
					var temphtml = ''+
						text.find('#position_select').val();
					$(this).html(temphtml);
				});

				$(this).html('Edit');
				$(this).addClass('edit');
				$(this).removeClass('done');

			}

			else if(traversed('studentnumber')){
				
				data.each(function(index){
					var temphtml = ''+
						text.find('#stud_year').val()+
						'-'+
						text.find('#stud_number').val();
					$(this).html(temphtml);
				});

				$(this).html('Edit');
				$(this).addClass('edit');
				$(this).removeClass('done');

			}

		});
	
});
