$(document).ready(function(){
	
	var about_content = '<div class="box"><div id="about-data"><div class="table-title"><strong>DETAILS<span class="glyphicon glyphicon-user"></span></strong></div><table class="table table-hover table-condensed"><tr><td>First name</td><td>Cla</td></tr><tr><td>Middle Name</td><td>Ganda</td></tr><tr><td>Last Name</td><td>Estremos</td></tr><tr><td>Organization Classification</td><td>Active</td></tr><tr><td>Department</td><td>Best Department</td></tr><tr><td>Student Number</td><td>2014-09272</td></tr><tr><td>Organization Batch</td><td>Penguins</td></tr><tr><td>University Batch</td><td>Batch \'14</td></tr><tr><td>Birthday</td><td>Month 1, 0000</td></tr><tr><td>Home Adress</td><td>Adress is here</td></tr><tr><td>College Adress</td><td>Adress is here too!</td></tr></table></div></div>';
	var mentor_content ='<div class="box"><div id="mentor-data"><div class="row"><div class="table-title"><strong>MENTOR<span class="glyphicon glyphicon-eye-open"></span></strong></div><hr/></div><div class="mentor-data-content-image"><img src="../images/Cla.jpg" class="img-responsive"/></div><div class="mentor-data-content-text"><div class="row"><div class="mentor-data-content-3"><div class="wrapper clearfix"><figure class="gallery-item"><h5>First Name</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div><div class="wrapper clearfix"><figure class="gallery-item"><h5>Middle Name</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div><div class="wrapper clearfix"><figure class="gallery-item"><h5>Last Name</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div></div></div><div class="row"><div class="mentor-data-content-1"><div class="wrapper clearfix"><figure class="gallery-item"><h5>Organization Classification</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div></div></div><div class="row"><div class="mentor-data-content-1"><div class="wrapper clearfix"><figure class="gallery-item"><h5>Department</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div></div></div><div class="row"><div class="mentor-data-content-1"><div class="wrapper clearfix"><figure class="gallery-item"><h5>Student Number</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div></div></div><div class="row"><div class="mentor-data-content-1"><div class="wrapper clearfix"><figure class="gallery-item"><h5>Organization Batch</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div></div></div><div class="row"><div class="mentor-data-content-1"><div class="wrapper clearfix"><figure class="gallery-item"><h5>University Batch</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div></div></div><div class="row"><div class="mentor-data-content-3"><div class="wrapper clearfix"><figure class="gallery-item"><h5>Month</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div><div class="wrapper clearfix"><figure class="gallery-item"><h5>Day</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div><div class="wrapper clearfix"><figure class="gallery-item"><h5>Year</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div></div></div><div class="row"><div class="mentor-data-content-4"><div class="wrapper clearfix"><figure class="gallery-item"><h5>Mentee</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div><div class="wrapper clearfix"><figure class="gallery-item"><h5>Mentee</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div><div class="wrapper clearfix"><figure class="gallery-item"><h5>Mentee</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div><div class="wrapper clearfix"><figure class="gallery-item"><h5>Mentee</h5><figcaption class="img-title"><h5>something</h5></figcaption></figure></div></div></div></div></div></div>';
	var mentee_content ='<div class="box"><div id="mentee-data"><div class="row"><div class="table-title"><strong>MENTEE<span class="glyphicon glyphicon-leaf"></span></strong></div><hr/></div><div class="row"><button id="mentee-1"><div class="mentee-data-image"><img src="../images/JV.jpg" class="img-responsive"/></div><div class="mentee-data-content text-left"><strong>This Name I. Name</strong><p>Active</p><p>Department should be here</p></div></button></div></div></div>';
	var more_content ='<div class="box"><div id="more-data"><div class="row"><div class="table-title"><strong>MORE<span class="glyphicon glyphicon-th-list"></span></strong></div><hr/></div></div></div>';
	
	window.onload = $('#box-data').slideDown(800);

	$("body").on('click',"#mentee-1",function(){
		if($(this).closest("#information").find(".mentee-1").is(":hidden")){
			$(this).closest("#information").find(".mentee-1").removeClass("hidden");
			$(this).closest("#information").find(".mentee-2").addClass("hidden");
			$(this).closest("#information").find(".mentee-3").addClass("hidden");
		}
	});

	$("body").on('click','#mentee-2',function(){
		if($(this).closest("#information").find(".mentee-2").is(":hidden")){
			$(this).closest("#information").find(".mentee-2").removeClass("hidden");
			$(this).closest("#information").find(".mentee-1").addClass("hidden");
			$(this).closest("#information").find(".mentee-3").addClass("hidden");
		}
	});

	$("body").on('click',"#mentee-3",function(){
		if($(this).closest("#information").find(".mentee-3").is(":hidden")){
			$(this).closest("#information").find(".mentee-3").removeClass("hidden");
			$(this).closest("#information").find(".mentee-2").addClass("hidden");
			$(this).closest("#information").find(".mentee-1").addClass("hidden");
		}
	});

	$("#about").on('click',function(){
		$(this).closest('#information').find('#box-data').html(about_content);
	});

	$("#mentor").on('click',function(){
		$(this).closest('#information').find('#box-data').html(mentor_content);
	});

	$("#mentee").on('click',function(){
		$(this).closest('#information').find('#box-data').html(mentee_content);
	});

	$("#more").on('click',function(){
		$(this).closest('#information').find('#box-data').html(more_content);

		$(this).closest("#information").find(".mentee-1").addClass("hidden");
		$(this).closest("#information").find(".mentee-2").addClass("hidden");
		$(this).closest("#information").find(".mentee-3").addClass("hidden");
	});
});

/*
					var about_content = '
					<div class="box">
						<div id="about-data" class="hidden">
							<div class="table-title">
								<strong>DETAILS
									<span class="glyphicon glyphicon-user"></span>
								</strong>
							</div>
							<table class="table table-hover table-condensed">
								<tr>
									<td>First name</td>
									<td>Cla</td>
								</tr>
								<tr>
									<td>Middle Name</td>
									<td>Ganda</td>
								</tr>
								<tr>
									<td>Last Name</td>
									<td>Estremos</td>
								</tr>
								<tr>
									<td>Organization Classification</td>
									<td>Active</td>
								</tr>
								<tr>
									<td>Department</td>
									<td>Best Department</td>
								</tr>
								<tr>
									<td>Student Number</td>
									<td>2014-09272</td>
								</tr>
								<tr>
									<td>Organization Batch</td>
									<td>Penguins</td>
								</tr>
								<tr>
									<td>University Batch</td>
									<td>Batch \'14</td>
								</tr>
								<tr>
									<td>Birthday</td>
									<td>Month 1, 0000</td>
								</tr>
								<tr>
									<td>Home Adress</td>
									<td>Adress is here</td>
								</tr>
								<tr>
									<td>College Adress</td>
									<td>Adress is here too!</td>
								</tr>
							</table>
						</div>
					</div>';

					var mentor_content ='
					<div class="box">
						
						<div id="mentor-data" class="hidden">
						  <div class="row">
							<div class="table-title"><strong>MENTOR<span class="glyphicon glyphicon-eye-open"></span></strong></div>
							<hr/>
						  </div>
						  <div class="mentor-data-content-image"><img src="../images/Cla.jpg" class="img-responsive"/></div>
						  <div class="mentor-data-content-text">
							<div class="row">
							  <div class="mentor-data-content-3">
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>First Name</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Middle Name</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Last Name</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
							  </div>
							</div>
							<div class="row">
							  <div class="mentor-data-content-1">
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Organization Classification</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
							  </div>
							</div>
							<div class="row">
							  <div class="mentor-data-content-1">
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Department</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
							  </div>
							</div>
							<div class="row">
							  <div class="mentor-data-content-1">
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Student Number</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
							  </div>
							</div>
							<div class="row">
							  <div class="mentor-data-content-1">
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Organization Batch</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
							  </div>
							</div>
							<div class="row">
							  <div class="mentor-data-content-1">
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>University Batch</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
							  </div>
							</div>
							<div class="row">
							  <div class="mentor-data-content-3">
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Month</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Day</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Year</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
							  </div>
							</div>
							<div class="row">
							  <div class="mentor-data-content-4">
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Mentee</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Mentee</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Mentee</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
								<div class="wrapper clearfix">
								  <figure class="gallery-item">
									<h5>Mentee</h5>
									<figcaption class="img-title">
									  <h5>something</h5>
									</figcaption>
								  </figure>
								</div>
							  </div>
							</div>
						  </div>
						</div>
					</div>';

					var mentee_content ='
					<div class="box">
						<div id="mentee-data" class="hidden">
							<div class="row">
								<div class="table-title"><strong>MENTEE<span class="glyphicon glyphicon-leaf"></span></strong></div>
								<hr/>
							</div>
							<div class="mentee-image-container">
								<div class="mentee-data-image">
									<button id="mentee-1"><img src="../images/JV.jpg" class="img-responsive"/></button>
								</div>
								<div class="mentee-data-image">
									<button id="mentee-2"><img src="../images/JV.jpg" class="img-responsive"/></button>
								</div>
								<div class="mentee-data-image">
									<button id="mentee-3"><img src="../images/JV.jpg" class="img-responsive"/></button>
								</div>
							</div>
							<div class="mentee-data-content">
								<div class="mentee-1 hidden">
									<div class="row">
									<table class="table table-hover table-condensed">
										<thead>
											<tr>
												<td>DETAILS</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td class="row-head">Full Name</td>
												<td>This I. Name</td>
											</tr>
											<tr>
												<td class="row-head">Organization Classification</td>
												<td>Something</td>
											</tr>
											<tr>
												<td class="row-head">Department</td>
												<td>Something</td>
											</tr>
											<tr>
												<td class="row-head">Student Number</td>
												<td>Something</td>
											</tr>
											<tr>
												<td class="row-head">Organization Batch</td>
												<td>Something</td>
											</tr>
											<tr>
												<td class="row-head">University Batch</td>
												<td>Something</td>
											</tr>
											<tr>
												<td class="row-head">Birthday</td>
												<td>Something</td>
											</tr>
										</tbody>
									</table>
								  </div>
								  <div class="row">
									<div class="mentee-data-content-1">
									  <div class="wrapper clearfix">
										<figure class="gallery-item">
										  <h5>Mentee</h5>
										  <figcaption class="img-title">
											<h5>something</h5>
										  </figcaption>
										</figure>
									  </div>
									</div>
								  </div>
								</div>
								<div class="mentee-2 hidden">
								  <div class="row">
									<table class="table table-hover table-condensed">
									  <thead>
										<tr>
										  <td>DETAILS</td>
										</tr>
									  </thead>
									  <tbody>
										<tr>
										  <td class="row-head">Full Name</td>
										  <td>Yeah Yeah I. Name</td>
										</tr>
										<tr>
										  <td class="row-head">Organization Classification</td>
										  <td>Something</td>
										</tr>
										<tr>
										  <td class="row-head">Department</td>
										  <td>Something</td>
										</tr>
										<tr>
										  <td class="row-head">Student Number</td>
										  <td>Something</td>
										</tr>
										<tr>
										  <td class="row-head">Organization Batch</td>
										  <td>Something</td>
										</tr>
										<tr>
										  <td class="row-head">University Batch</td>
										  <td>Something</td>
										</tr>
										<tr>
										  <td class="row-head">Birthday</td>
										  <td>Something</td>
										</tr>
									  </tbody>
									</table>
								  </div>
								  <div class="row">
									<div class="mentee-data-content-2">
									  <div class="wrapper clearfix">
										<figure class="gallery-item">
										  <h5>Mentee</h5>
										  <figcaption class="img-title">
											<h5>something</h5>
										  </figcaption>
										</figure>
									  </div>
									  <div class="wrapper clearfix">
										<figure class="gallery-item">
										  <h5>Mentee</h5>
										  <figcaption class="img-title">
											<h5>something</h5>
										  </figcaption>
										</figure>
									  </div>
									</div>
								  </div>
								</div>
								<div class="mentee-3 hidden">
								  <div class="row">
									<table class="table table-hover table-condensed">
									  <thead>
										<tr>
										  <td>DETAILS</td>
										</tr>
									  </thead>
									  <tbody>
										<tr>
										  <td class="row-head">Full Name</td>
										  <td>This I. Something</td>
										</tr>
										<tr>
										  <td class="row-head">Organization Classification</td>
										  <td>Something</td>
										</tr>
										<tr>
										  <td class="row-head">Department</td>
										  <td>Something</td>
										</tr>
										<tr>
										  <td class="row-head">Student Number</td>
										  <td>Something</td>
										</tr>
										<tr>
										  <td class="row-head">Organization Batch</td>
										  <td>Something</td>
										</tr>
										<tr>
										  <td class="row-head">University Batch</td>
										  <td>Something</td>
										</tr>
										<tr>
										  <td class="row-head">Birthday</td>
										  <td>Something</td>
										</tr>
									  </tbody>
									</table>
								  </div>
								  <div class="row">
									<div class="mentee-data-content-3">
									  <div class="wrapper clearfix">
										<figure class="gallery-item">
										  <h5>Mentee</h5>
										  <figcaption class="img-title">
											<h5>something</h5>
										  </figcaption>
										</figure>
									  </div>
									  <div class="wrapper clearfix">
										<figure class="gallery-item">
										  <h5>Mentee</h5>
										  <figcaption class="img-title">
											<h5>something</h5>
										  </figcaption>
										</figure>
									  </div>
									  <div class="wrapper clearfix">
										<figure class="gallery-item">
										  <h5>Mentee</h5>
										  <figcaption class="img-title">
											<h5>something</h5>
										  </figcaption>
										</figure>
									  </div>
									</div>
								  </div>
								</div>
							  </div>
							</div>
					</div>';

					var more_content ='
					<div class="box">

						<div id="more-data" class="hidden">
						  <div class="row">
							<div class="table-title"><strong>MORE<span class="glyphicon glyphicon-th-list"></span></strong></div>
							<hr/>
						  </div>
						</div>
					</div>';
*/