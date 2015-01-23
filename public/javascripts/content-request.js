$(document).ready(function(){
	$("body").on("click",".ajax",function(){
		// use this for requested url: $(this).attr('href')
		//insert ajax part here

		var root = location.href.replace(location.pathname,"");

		$.ajax({
			url: $(this).attr('href') == "/"?root + $(this).attr('href')+"content":$(this).attr('href')+"/content",
			data: "",
			type: "GET",
			success: function (res) {
				$("#content").html(res);
				$("body").scrollTop(0);
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
			url: location.pathname=="/"?"/content":location.pathname+"/content",
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
		return false;
	});
});
