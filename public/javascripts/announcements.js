$(document).ready(function(){
	$(".hoverClose").click(function(){
		$(this).parent().parent().remove();
	});
});