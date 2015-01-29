$.ajax({
	url: "/search",
	data: "",
	type: "GET",
	success: function (res) {
		$( "#tags" ).autocomplete({
			source: res,
			select: function(event,ui){
				//redirect to page via ajax
				$.ajax({
					url: ui.item.url+"/content",
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
				history.pushState(null, null, ui.item.url);
				//clear searchbar
				$("#tags").val("");
				return false;
			}
		})
		.autocomplete( "instance" )._renderItem = function( ul, item ) {
			return $( "<li>" )
			.append( "<a>" + "<img src='/" + item.picture +"' style='width:50px;margin-right:15px;'>" + item.value + "</a>" )
			.appendTo( ul );
		};
	},
	error: function (e){
		console.dir(e);
	}
});
