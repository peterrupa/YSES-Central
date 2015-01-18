$(document).ready(function(){

		$.ajax({
			url: "http://localhost:8080/getPendingAccounts",
			type: "GET",
			success: function(res){
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
									case 'home_address': 	tempData = 'Home Address'; break;
									case 'college_address': tempData = 'College Address'; break;
									case 'exec_position': 	tempData = 'Executive Position'; break;
									default: 				tempData = ' '; break;
								}

								if(data == "mentee"){
									// var counter = '';
									var mentee = '';
									var temphtml = '';
									if(0 < res[i]["mentee"].length){
										for(var j = 0; j < res[i]["mentee"].length; j++){
											// if(counter == 0){
											/*	counter += 1;
											} else{
												var temphtml2 = ''+
													'<tr class="text" data-mentee="'+res[i]["mentee"][j]+'">'+
														'<td>'+
														'</td>'+
														'<td>'+res[i]["mentee"][j]+'</td>'+
														'<td>'+'<a class="edit">Edit</a>'+'</td>'+
													'</tr>';
											}*/
											mentee = ''+
												'<span id="mentee-'+(j+1)+'" class="mentee-data">'+
													res[i]["mentee"][j]+
												'</span>';
											temphtml = temphtml.concat(mentee);
											temphtml = temphtml.concat('<br>');
										}
										var temphtml2 = ''+
											'<tr id="mentees" class="mentee-list" data-mentee>'+
												'<td>'+
													'Mentees'+
												'</td>'+
												'<td>'+temphtml+'</td>'+
												'<td>'+'<a class="edit">Edit</a>'+'</td>'+
											'</tr>';
										table_data_1 = table_data_1.concat(temphtml2);
									}
									else{
										var temphtml2 = ''+
											'<tr id="mentees" class="mentee-list" data-mentee>'+
												'<td>'+
													'Mentees'+
												'</td>'+
												'<td></td>'+
												'<td>'+'<a class="edit">Edit</a>'+'</td>'+
											'</tr>';
										table_data_1 = table_data_1.concat(temphtml2);
									}
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
								'<div data-username="'+res[i]['username']+'" class="to-validate to-validate-'+i+'">'+
									img+
									'<div id="title-container">'+
										'<h3>'+res[i]['first_name']+' '+res[i]['last_name']+'</h3>'+
										'<span>'+res[i]['department']+' Department'+'</span>'+
									'</div>'+
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
			},
			error: function (e){
				if(e.status == 404){
					$("#temp").append("No pending accounts"); //generate cool html for this
				}
				else{
					console.dir(e);
				}
			}
		});

		$("body").off("click",".accept");
		$("body").on("click",".accept",function(){
			var validate = $(this).closest(".to-validate");
			//check if there are input boxes
			if(validate.find("input, option").length > 0){
				alert("Insert fancy error here. Please finalize all edits before clicking accept!");
			}
			else{
				button = $(this);

				//fetch all mentees
				var mentee = [];

				validate.find(".mentee-list").find("span").each(function(i){
					mentee.push($(this).html());
				});

				var data = {origusername:validate.data("username"),
					   username:validate.find('tr[data-username]').children("td:nth-child(2)").html(),
					   first_name:validate.find('tr[data-first_name]').children("td:nth-child(2)").html(),
					   middle_name:validate.find('tr[data-middle_name]').children("td:nth-child(2)").html(),
					   last_name:validate.find('tr[data-last_name]').children("td:nth-child(2)").html(),
					   org_class:validate.find('tr[data-org_class]').children("td:nth-child(2)").html(),
					   department:validate.find('tr[data-department]').children("td:nth-child(2)").html(),
					   student_number:validate.find('tr[data-student_number]').children("td:nth-child(2)").html(),
					   org_batch:validate.find('tr[data-org_batch]').children("td:nth-child(2)").html(),
					   univ_batch:validate.find('tr[data-univ_batch]').children("td:nth-child(2)").html(),
					   mentor:validate.find('tr[data-mentor]').children("td:nth-child(2)").html(),
					   mentee:mentee,
					   birthday:validate.find('tr[data-birthday]').children("td:nth-child(2)").html(),
					   home_address:validate.find('tr[data-home_address]').children("td:nth-child(2)").html(),
					   college_address:validate.find('tr[data-college_address]').children("td:nth-child(2)").html(),
					   picture:validate.find(".account-image").data("picture"),
					   exec_position:validate.find('tr[data-exec_position]').children("td:nth-child(2)").html()};

				console.log(data);

				alert("No accept functionality yet. But you can see at console the data to be sent.");

			  // $.ajax({
				// 	url: "http://localhost:8080/acceptAccount",
				// data: {origusername:validate.data("username"),
				// 	   username:validate.find('tr[data-username]').children("td:nth-child(2)").html(),
				// 	   first_name:validate.find('tr[data-first_name]').children("td:nth-child(2)").html(),
				// 	   middle_name:validate.find('tr[data-middle_name]').children("td:nth-child(2)").html(),
				// 	   last_name:validate.find('tr[data-last_name]').children("td:nth-child(2)").html(),
				// 	   org_class:validate.find('tr[data-org_class]').children("td:nth-child(2)").html(),
				// 	   department:validate.find('tr[data-department]').children("td:nth-child(2)").html(),
				// 	   student_number:validate.find('tr[data-student_number]').children("td:nth-child(2)").html(),
				// 	   org_batch:validate.find('tr[data-org_batch]').children("td:nth-child(2)").html(),
				// 	   univ_batch:validate.find('tr[data-univ_batch]').children("td:nth-child(2)").html(),
				// 	   mentor:validate.find('tr[data-mentor]').children("td:nth-child(2)").html(),
				// 	   mentee:mentee,
				// 	   birthday:validate.find('tr[data-birthday]').children("td:nth-child(2)").html(),
				// 	   home_address:validate.find('tr[data-home_address]').children("td:nth-child(2)").html(),
				// 	   college_address:validate.find('tr[data-college_address]').children("td:nth-child(2)").html(),
				// 	   picture:validate.find(".account-image").data("picture"),
				// 	   exec_position:validate.find('tr[data-exec_position]').children("td:nth-child(2)").html()},
				// 		type: "POST",
				// 		success: function(res){
				// 			validate.remove();
				// 			alert("Successful accept!");
				// 			//insert success window here
				// 		},
				// 		error: function (e){
				// 			console.dir(e);
				// 		}
				// 	});
			}
		});

		$("body").off("click",".reject");
		$("body").on("click",".reject",function(){
			var validate = $(this).closest(".to-validate");

			//check if there are input boxes
			if(validate.find("input, option").length > 0){
				alert("Insert fancy error here. Please finalize all edits before clicking reject!");
			}
			else{
				button = $(this);
				$.ajax({
					url: "http://localhost:8080/rejectAccount",
					data: {origusername:validate.data('username'),
								 picture:validate.find(".account-image").data("picture")},
					type: "POST",
					success: function (res){
						validate.remove();
						alert("Successful reject!");
						//insert success window here
					},
					error: function (e){
						console.log(e);
					}
				});
			}
		});

	var old_value = '';

	function alertChanges(old_value, data){
		if(old_value != data.text()) alert(data.prev().text() + " changed from " + old_value + " to " + data.text());
		else alert("No changes for this data");
	};

	$('body').off('click','.edit');

	/*EDIT DATA IN ABOUT*/
	$("body").on("click",".edit",function(){

			var data = $(this).closest("tr").find("td").first().next();
			old_value = data.text();

			$(this).html('Done');
			$(this).addClass('done');
			$(this).removeClass('edit');

			// will convert data to text box
			if($(this).parent().find("input").length > 0){
				alert("There are boxes");
			}

			else if($(this).closest('tr').hasClass('text')){
				data.each(function(index){
					var temphtml = ''+
						'<input type="text" value="'+$(this).html()+'">';
					$(this).html(temphtml);
				});
			}

			// will convert data to a mentee inputs (can add or remove mentees)
			else if($(this).closest('tr').hasClass('mentee-list')){
				if(data.find('span').length == 0){
					//case when there are no mentees
					var blankhtml = ''+
					'<div class="mentee-field input-group">'+
						'<input '+
							'class="mentee-textfield"'+
							'type="text" '+
							'name="mentee"'+
						'/>'+
						'<span class="input-group-btn">'+
							'<button class="add-mentee btn" type="button">'+
								'<span>+</span>'+
							'</button>'+
						'</span>'+
					'</div>';

					data.append(blankhtml);
				}
				else{
					//case when there are mentees
					data.find('span').each(function(){
						var blankhtml = ''+
						'<div class="mentee-field input-group">'+
							'<input '+
								'class="mentee-textfield"'+
								'type="text" '+
								'name="mentee"'+
							'/>'+
							'<span class="input-group-btn">'+
								'<button class="add-mentee btn" type="button">'+
									'<span>+</span>'+
								'</button>'+
							'</span>'+
						'</div>';

						var temphtml = ''+
						'<div class="mentee-field input-group">'+
							'<input '+
								'class="mentee-textfield"'+
								'type="text" '+
								'value="'+$(this).text()+'"'+
								'name="mentee"'+
							'/>'+
							'<span class="input-group-btn">'+
								'<button class="remove-mentee btn" type="button">'+
									'<span>x</span>'+
								'</button>'+
							'</span>'+
						'</div>';

						if($(this).parent().children().length == 2 || $(this).is(":last-child")){
							temphtml = temphtml + blankhtml;
						}

						$(this).closest('tr').find('br').remove();
						$(this).replaceWith(temphtml);


					});
				}
			}

			// will convert data to a datepicker
			else if($(this).closest('tr').hasClass('birthdate')){
				data.each(function(index){
					var temphtml = ''+
						'<input style="width:130px;height:20px;" type="date" value="'+$(this).html()+'">';
					$(this).html(temphtml);
				});
			}

			// will convert data to a dropdown select [org_class]
			else if($(this).closest('tr').hasClass('org_class')){
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
				data.each(function(index){
					var temphtml = ''+
						'<select  id="position_select"name="position">'+
							'<option value="Not an Executive Department Member">Not an Executive Department Member</option>'+
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

			// will convert data to a dropdown select [studentnumber]
			else if($(this).closest('tr').hasClass('studentnumber')){
				data.each(function(index){
					var temphtml = ''+
						'<input style="width:70px;" type="text" id="stud_year" maxlength=4 value="'+$(this).html().substring(0,4)+'">'+
						'<span> - </span>'+
						'<input style="width:70px;" type="text" id="stud_number" maxlength=5 value="'+$(this).html().substring(5)+'">';
					$(this).html(temphtml);
				});
			}
			data.find('input').off('keypress');
			data.find('input').on('keypress', function(e) {
				var code = e.keyCode || e.which;
				if(!$(this).closest('tr').hasClass('mentee-list')){
					if(!$(this).closest('tr').hasClass('studentnumber')){
						var temphtml = ''+
							$(this).val();
					}else{
						var temphtml = ''+
							text.find('#stud_year').val()+
							'-'+
							text.find('#stud_number').val();
						$(this).html(temphtml);
					}
					if(code==13){
						$(this).closest("tr").find(".done").html('Edit');
						$(this).closest("tr").find(".done").addClass('edit');
						$(this).closest("tr").find(".done").removeClass('done');
						temphtml = safe_tags(temphtml);
						data.html(temphtml);
						alertChanges(old_value,data);
					}
				}
			});
	});

	$('body').off('click','.done');

	$('body').on('click','.done', function(){

		var text = $(this).closest("tr");
		var data = text.find("td").first().next();
		var traversed = function(class_name){
			return text.hasClass(class_name);
		}

		if(traversed('text') || traversed('birthdate')){

			data.each(function(index){
				var temphtml = ''+
					text.find('input').val();
				temphtml = safe_tags(temphtml);
				$(this).html(temphtml);

			});
		}
		else if(traversed('org_class')
			|| traversed('org_batch')
			|| traversed('department')
			|| traversed('position')){
			data.each(function(index){
				var temphtml = ''+
					text.find('select').val();
				$(this).html(temphtml);
			});
		}
		else if(traversed('mentee-list')){
			var mentee = '';
			var newLine = '';
			var temphtml = '';
			text.find('.mentee-textfield').each(function(index){
				if($(this).is(':last-child')) newLine = '';
				else newLine = '<br>';

				if($(this).val() != ''){
					mentee = $(this).val();
					mentee = safe_tags(mentee);
					$(this).closest('.mentee-field').replaceWith('<span>'+mentee+'</span>'+'<br>');
				} else {
					$(this).closest('.mentee-field').remove();
				}
			});
		}
		else if(traversed('studentnumber')){
			data.each(function(index){
				var temphtml = ''+
					text.find('#stud_year').val()+
					'-'+
					text.find('#stud_number').val();
				temphtml = safe_tags(temphtml);
				$(this).html(temphtml);
			});
		}
		$(this).html('Edit');
		$(this).addClass('edit');
		$(this).removeClass('done');

		alertChanges(old_value,data);
	});

	// needs work. will revert input fields clicked outside it's container.
	$(document).mouseup(function (e){
		var container = $('.done');

		if ( (!container.is(e.target) && container.has(e.target).length === 0)){

		}
	});

	//listen for newaccount events
	socket.off('newaccount');
	socket.on('newaccount',function(res){
		var table_data_2 = ''+
			'<table class="table table-condensed table-hover">';
		var table_data_1 = '';
		var img = '';
		for(data in res){
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
				case 'home_address': 	tempData = 'Home Address'; break;
				case 'college_address': tempData = 'College Address'; break;
				case 'exec_position': 	tempData = 'Executive Position'; break;
				default: 				tempData = ' '; break;
			}

			if(data == "mentee"){
				var counter = 0;
				var temphtml = '';
				for(var j = 0; j < res["mentee"].length; j++){
					if(counter == 0){
						var temphtml2 = ''+
							'<tr class="text" data-mentee="'+res["mentee"][j]+'">'+
								'<td>'+
									'Mentees'+
								'</td>'+
								'<td>'+res["mentee"][j]+'</td>'+
								'<td>'+'<a class="edit">Edit</a>'+'</td>'+
							'</tr>';
						counter += 1;
					} else{
						var temphtml2 = ''+
							'<tr class="text" data-mentee="'+res["mentee"][j]+'">'+
								'<td>'+
								'</td>'+
								'<td>'+res["mentee"][j]+'</td>'+
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

					if(res['exec_position'] == null) position = 'Not an Executive Department Member';
					else position = res['exec_position'];

					var temphtml = ''+
						'<tr class="position" data-'+'exec-position'+'="'+res['exec_position']+'">'+
							'<td>'+'Executive Position'+'</td>'+
							'<td>'+position+'</td>'+
							'<td>'+'<a class="edit">Edit</a>'+'</td>'+
						'</tr>';
					table_data_1 = '<table class="table table-condensed table-hover">' + temphtml + table_data_1;
				} else if(data == "picture"){
					var temphtml = ''+
						'<div data-'+data+'="'+res["picture"]+'" class="account-image">'+
							'<img src="http://localhost:8080/'+res["picture"]+'"/>'+
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
						'<tr class="'+data_class+'" data-'+data+'="'+res[data]+'">'+
							'<td>'+tempData+'</td>'+
							'<td>'+res[data]+'</td>'+
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
					'<tr class="'+data_class+'" data-'+data+'="'+res[data]+'">'+
						'<td>'+tempData+'</td>'+
						'<td>'+res[data]+'</td>'+
						'<td>'+'<a class="edit">Edit</a>'+'</td>'+
					'</tr>';
				table_data_2 = table_data_2.concat(temphtml);
			}
		}
		var html = ''+
			'<div data-username="'+res['username']+'" class="to-validate">'+
				img+
				'<h3 style="float:left;font-weight:bold;padding-top:0px">'+res['first_name']+' '+res['last_name']+'</h3>'+
				'<span style="float:left;padding-top:29px;margin-left:10px;">'+res['department']+' Department'+'</span>'+
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
		alert("NEW ACCOUNT. DO SOME FANCY STUFFS");
	});

	$("body").on('click','.mentee-field .add-mentee',function(){
		var newfield = '<div class="mentee-field input-group"><input class="mentee-textfield" type="text" name="mentee"><span class="input-group-btn"><button class="add-mentee btn" type="button"><span>+</span></span></div>'
		$(this).find('span').remove();
		$(this).append('<span>x</span>');
		$(this).removeClass('add-mentee');
		$(this).addClass('remove-mentee');
		$(this).closest('.mentee-list').find('td').first().next().append(newfield);
	});

	$("body").on('click','.mentee-field .remove-mentee',function(){
		$(this).parent().parent().remove();
	});
});
