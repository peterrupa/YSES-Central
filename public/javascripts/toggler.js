$(document).ready(function(){

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
						'<img src="../images/Cla.jpg" class="img-responsive"/>'+
					'</div>'+
					'<div class="mentor-data-content-text">'+
						'<table class="table table-hover">'+
							'<tr>'+
								'<td class="row-header">'+
									'<strong>Name: </strong>'+
								'</td>'+
								'<td>'+
									'<p>Name T. Somethingname</p>'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td class="row-header">'+
									'<strong>Classification: </strong>'+
								'</td>'+
								'<td>'+
									'<p>Active</p>'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td class="row-header">'+
									'<strong>Department: </strong>'+
								'</td>'+
								'<td>'+
									'<p>Senior Projects and Activities Department</p>'+
								'</td>'+
							'</tr>'+
							'<tr>'+
								'<td class="row-header">'+
									'<strong>Batch: </strong>'+
								'</td>'+
								'<td>'+
									'<p>rainByte \'12</p>'+
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
					'<a id="mentor-profile">'+
						'<div class="mentor-link">'+
							'<p>Go to profile</p>'+
						'</div>'+
					'</a>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';

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

	window.onload = $('#box-data').slideDown(800);

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

		$.ajax({
			url: "http://localhost:8080/getdetails",
			data: "account="+location.pathname.substring(9),
			type: "GET",
			success: function (res) {
				switch(res["department"]){
					case "jpad": res["department"] = "Junior Projects and Activities Department";
					break;
					case "spad": res["department"] = "Senior Projects and Activities Department";
					break;
					case "vl": res["department"] = "Visuals and Logistics Department";
					break;
					case "sec": res["department"] = "Secretariat Department";
					break;
					case "scho": res["department"] = "Scholastics Department";
					break;
					case "fin": res["department"] = "Finance Department";
					break;
					case "hr": res["department"] = "Human Resources Department";
					break;
					case "exec": res["department"] = "Executive Department";
					break;
				}
				if(res["exec_position"]){
					switch(res["exec_position"]){
						case "deo": res["exec_position"] = "Deputy Executive Officer";
										break;
						case "lo": res["exec_position"] = "Liaison Officer";
										break;
						case "vlh": res["exec_position"] = "Visuals and Logistics Head";
										break;
						case "ea": res["exec_position"] = "Executive Assistant";
										break;
						case "sh": res["exec_position"] = "Scholastics Head";
										break;
						case "fh": res["exec_position"] = "Finance Head";
										break;
						case "hrh": res["exec_position"] = "Human Resources Head";
										break;
						case "eo": res["exec_position"] = "Executive Officer";
										break;
					}
				}

				function rowHTML(first,second){
					return '<tr>'+
							'<td>'+first+'</td>'+
							'<td>'+second+'</td>'+
						'</tr>';
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
		$(this).closest('#information').find('#box-data').html(mentor_content);
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
					for(var i = 0; i < res.length; i++){
						var middlename = res[i]["middle_name"].split(" ");
						var middlenameinitials = "";
						for(var j = 0; j < middlename.length; j++){
							middlenameinitials = middlenameinitials.concat(middlename[j].substring(0,1));
						}
						var fullname = res[i]["first_name"] + " " + middlenameinitials + ". " + res[i]["last_name"];

						switch(res[i]["department"]){
							case "jpad": var department = "Junior Projects and Activities Department";
							break;
							case "spad": var department = "Senior Projects and Activities Department";
							break;
							case "vl": var department = "Visuals and Logistics Department";
							break;
							case "sec": var department = "Secretariat Department";
							break;
							case "scho": var department = "Scholastics Department";
							break;
							case "fin": var department = "Finance Department";
							break;
							case "hr": var department = "Human Resources Department";
							break;
							case "exec": var department = "Executive Department";
							break;
						}
						var menteeHTML = "<div class='row mentee-content'><a class='ajax' href='http://localhost:8080/profile/" + res[i]["first_name"] +"'><div class='mentee-data-image'><img src='http://localhost:8080/" + res[i]["picture"] + "' class='img-responsive'></div><div class='mentee-data-content text-left'><strong>" + fullname + "</strong><p>" + res[i]["org_class"] + "</p><p>" + department + "</p></div></a></div>";
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