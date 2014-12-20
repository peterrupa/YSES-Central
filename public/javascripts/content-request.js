$(document).ready(function(){
	$(".ajax").click(function(){
		// use this for requested url: $(this).attr('href')
		//insert ajax part here
		$.ajax({
			async: false,
			url: $(this).attr('href')+"/content",
			data: "",
			type: "GET",
			success: function (res) {
				$("#content").html(res);
			},
			error: function (e){
				console.dir(e);
			}
		});
		//update browser url
		history.pushState(null, null, $(this).attr('href'));
		return false;
	});
	
	window.addEventListener("popstate", function(e) {
		$.ajax({
			async: false,
			url: location.pathname=="/"?"http://localhost:8080/content":location.pathname+"/content",
			data: "",
			type: "GET",
			success: function (res) {
				$("#content").html(res);
			},
			error: function (e){
				console.dir(location.pathname+"/content");
				console.dir(e);
			}
		});
		//update browser url
		return false;
	});
});