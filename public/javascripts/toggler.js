$(document).ready(function(){
	
	$('#box-data').slideDown(800);

	$("#about").on('click',function(){
		if($(this).closest("#information").find("#about-data").is(":hidden")){
			$(this).closest("#information").find("#about-data").removeClass("hidden");
			$(this).closest("#information").find("#mentor-data").addClass("hidden");
			$(this).closest("#information").find("#mentee-data").addClass("hidden");
			$(this).closest("#information").find("#more-data").addClass("hidden");
		}
	});

	$("#mentor").on('click',function(){
		if($(this).closest("#information").find("#mentor-data").is(":hidden")){
			$(this).closest("#information").find("#mentor-data").removeClass("hidden");
			$(this).closest("#information").find("#about-data").addClass("hidden");
			$(this).closest("#information").find("#mentee-data").addClass("hidden");
			$(this).closest("#information").find("#more-data").addClass("hidden");
		}
	});

	$("#mentee").on('click',function(){
		if($(this).closest("#information").find("#mentee-data").is(":hidden")){
			$(this).closest("#information").find("#mentee-data").removeClass("hidden");
			$(this).closest("#information").find("#about-data").addClass("hidden");
			$(this).closest("#information").find("#mentor-data").addClass("hidden");
			$(this).closest("#information").find("#more-data").addClass("hidden");
		}
	});

	$("#more").on('click',function(){
		if($(this).closest("#information").find("#more-data").is(":hidden")){
			$(this).closest("#information").find("#more-data").removeClass("hidden");
			$(this).closest("#information").find("#about-data").addClass("hidden");
			$(this).closest("#information").find("#mentor-data").addClass("hidden");
			$(this).closest("#information").find("#mentee-data").addClass("hidden");
		}
	});

	$("#mentee-1").on('click',function(){
		if($(this).closest("#information").find(".mentee-1").is(":hidden")){
			$(this).closest("#information").find(".mentee-1").removeClass("hidden");
			$(this).closest("#information").find(".mentee-2").addClass("hidden");
			$(this).closest("#information").find(".mentee-3").addClass("hidden");
		}
	});

	$("#mentee-2").on('click',function(){
		if($(this).closest("#information").find(".mentee-2").is(":hidden")){
			$(this).closest("#information").find(".mentee-2").removeClass("hidden");
			$(this).closest("#information").find(".mentee-1").addClass("hidden");
			$(this).closest("#information").find(".mentee-3").addClass("hidden");
		}
	});

	$("#mentee-3").on('click',function(){
		if($(this).closest("#information").find(".mentee-3").is(":hidden")){
			$(this).closest("#information").find(".mentee-3").removeClass("hidden");
			$(this).closest("#information").find(".mentee-2").addClass("hidden");
			$(this).closest("#information").find(".mentee-1").addClass("hidden");
		}
	});
});