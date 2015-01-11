$(document).ready(function(){

	var more_content =''+
	'<div class="box">'+
		'<div id="more-data">'+
			'<div class="row">'+
				'<div class="table-title">'+
					'<strong>MORE<span class="glyphicon glyphicon-th-list"></span></strong>'+
				'</div>'+
				'<hr/>'+
			'</div>'+
		'</div>'+
	'</div>';

	window.onload = $('#box-data').slideDown(1);

	$("#about").on('click',function(){
		var about_content =
		'<div class="box">'+
			'<div id="about-data">'+
				'<div class="table-title">'+
					'<strong>DETAILS'+
						'<span class="glyphicon glyphicon-user"></span>'+
					'</strong>'+
				'</div>'+
				'<hr>'+
				'<table class="table table-hover table-condensed">'+
				'</table>'+
			'</div>'+
		'</div>';

		$('#box-data').html(about_content);

		//about
		$.ajax({
			url: "http://localhost:8080/getdetails",
			data: "account="+location.pathname.substring(9),
			type: "GET",
			success: function (res) {
				function rowHTML(first,second){
					return '<tr>'+
							'<td>'+first+'</td>'+
							'<td>'+second+'</td>'+
						'</tr>';
				}

				for(data in res){
					res[data] = safe_tags(res[data]);
				}

				$("#about-data table").append(rowHTML("First name",res["first_name"]));
				$("#about-data table").append(rowHTML("Middle name",res["middle_name"]));
				$("#about-data table").append(rowHTML("Last name",res["last_name"]));
				$("#about-data table").append(rowHTML("Org Classification",res["org_class"]));
				$("#about-data table").append(rowHTML("Department",res["department"]));
				if(res["exec_position"]){
					$("#about-data table").append(rowHTML("Position",res["exec_position"]));
				}
				$("#about-data table").append(rowHTML("Student Number",res["student_number"]));
				$("#about-data table").append(rowHTML("Organization Batch",res["org_batch"]));
				$("#about-data table").append(rowHTML("University Batch",res["univ_batch"]));
				$("#about-data table").append(rowHTML("Birthday",res["birthday"]));
				$("#about-data table").append(rowHTML("Home Address",res["home_address"]));
				$("#about-data table").append(rowHTML("College Address",res["college_address"]));
			},
			error: function (e){
				console.dir(e);
			}
		});

	});

	$("#mentor").on('click',function(){

		//fetch mentee content via ajax
		$.ajax({
			url: "http://localhost:8080/getmentor",
			data: "account="+location.pathname.substring(9),
			type: "GET",
			success: function (res) {
				for(data in res){ //clean possible HTML tags
					res[data] = safe_tags(res[data]);
				}

				if(res["status"] == "None"){
					var mentor_content =''+
					'<div class="box">'+
						'<div id="mentor-data">'+
							'<div class="row">'+
								'<div class="table-title">'+
									'<strong>MENTOR</strong>'+
									'<span class="glyphicon glyphicon-eye-open"></span>'+
								'</div>'+
								'<hr/>'+
							'</div>'+
							'<div class="row">'+
								'<div class="mentor-data-content">'+
									'<div class="mentor-data-content-image">'+
										'<img src="http://localhost:8080/images/unknownpic.jpg" class="img-responsive"/>'+
									'</div>'+
									'<div class="mentor-data-content-text">'+
										'<table class="table table-hover">'+
											'<tr>'+
												'<td class="row-header">'+
													'<strong>Name: </strong>'+
												'</td>'+
												'<td>'+
													'<p>'+ res["full_name"] +'</p>'+
												'</td>'+
											'</tr>'+
										'</table>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';

					$('#box-data').html(mentor_content);
				}
				else{
					var mentor_content =''+
					'<div class="box">'+
						'<div id="mentor-data">'+
							'<div class="row">'+
								'<div class="table-title">'+
									'<strong>MENTOR</strong>'+
									'<span class="glyphicon glyphicon-eye-open"></span>'+
								'</div>'+
								'<hr/>'+
							'</div>'+
							'<div class="row">'+
								'<div class="mentor-data-content">'+
									'<div class="mentor-data-content-image">'+
										'<img src="http://localhost:8080/'+ res["picture"] +'" class="img-responsive"/>'+
									'</div>'+
									'<div class="mentor-data-content-text">'+
										'<table class="table table-hover">'+
											'<tr>'+
												'<td class="row-header">'+
													'<strong>Name: </strong>'+
												'</td>'+
												'<td>'+
													'<p>'+ res["full_name"] +'</p>'+
												'</td>'+
											'</tr>'+
											'<tr>'+
												'<td class="row-header">'+
													'<strong>Classification: </strong>'+
												'</td>'+
												'<td>'+
													'<p>' + res["org_class"] + '</p>'+
												'</td>'+
											'</tr>'+
											'<tr>'+
												'<td class="row-header">'+
													'<strong>Department: </strong>'+
												'</td>'+
												'<td>'+
													'<p>' + res["department"] + '</p>'+
												'</td>'+
											'</tr>'+
											'<tr>'+
												'<td class="row-header">'+
													'<strong>Organization Batch: </strong>'+
												'</td>'+
												'<td>'+
													'<p>' + res["org_batch"] + '</p>'+
												'</td>'+
											'</tr>'+
										'</table>'+
									'</div>'+
								'</div>'+
								'<div class="mentor-navigation text-center">'+
									'<a id="classification">'+
										'<div class="mentor-link">'+
											'<p>Semtheng Here</p>'+
										'</div>'+
									'</a>'+
									'<a id="mentor-profile" href="http://localhost:8080/profile/'+ res["username"] +'">'+
										'<div class="mentor-link">'+
											'<p>Go to profile</p>'+
										'</div>'+
									'</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';

					$('#box-data').html(mentor_content);
				}
			},
			error: function (e){
				console.dir(e);
			}
		});
	});

	$("#mentee").on('click',function(){
		var mentee_content ='<div class="box"><div id="mentee-data"><div class="row"><div class="table-title"><strong>MENTEE<span class="glyphicon glyphicon-leaf"></span></strong></div><hr/></div></div></div>';


		$(this).closest('#information').find('#box-data').html(mentee_content);

		//fetch mentee content via ajax
		$.ajax({
			url: "http://localhost:8080/getmentees",
			data: "account="+location.pathname.substring(9),
			type: "GET",
			success: function (res) {
				if(res == "0"){
					//edit this
					$("#mentee-data").append("No mentees");
				}
				else{
					//mentees with accounts
					for(var i = 0; i < res.accounts.length; i++){
						for(data in res.accounts[i]){ //clean possible HTML tags
							res.accounts[i][data] = safe_tags(res.accounts[i][data]);
						}
						var middlename = res.accounts[i]["middle_name"].split(" ");
						var middlenameinitials = "";
						for(var j = 0; j < middlename.length; j++){
							middlenameinitials = middlenameinitials.concat(middlename[j].substring(0,1));
						}
						var fullname = res.accounts[i]["first_name"] + " " + middlenameinitials + ". " + res.accounts[i]["last_name"];

						var menteeHTML = "<div class='row mentee-content'><a class='ajax' href='http://localhost:8080/profile/" + res.accounts[i]["username"] +"'><div class='mentee-data-image'><img src='http://localhost:8080/" + res.accounts[i]["picture"] + "' class='img-responsive'></div><div class='mentee-data-content text-left'><strong>" + fullname + "</strong><p>" + res.accounts[i]["org_class"] + "</p><p>" + res.accounts[i]["department"] + "</p></div></a></div>";
						$("#mentee-data").append(menteeHTML);
					}
					//mentees without accounts
					for(var i = 0; i < res.noaccounts.length; i++){
						res.noaccounts[i] = safe_tags(res.noaccounts[i]);
						var menteeHTML = "<div class='row mentee-content'><div class='mentee-data-image'><img src='http://localhost:8080/images/unknownpic.jpg' class='img-responsive'></div><div class='mentee-data-content text-left'><strong>" + res.noaccounts[i] + "</strong></div>";
						$("#mentee-data").append(menteeHTML);
					}
				}
			},
			error: function (e){
				console.dir(e);
			}
		});
	});

	$("#more").on('click',function(){
		$(this).closest('#information').find('#box-data').html(more_content);
	});
});
