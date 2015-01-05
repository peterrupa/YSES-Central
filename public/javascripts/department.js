$(document).ready(function(){
	$("a.menu-icon-department").click(function(e) {
		e.preventDefault();
		if($(this).closest('#header').find('#department-button-container').is(":visible"))
			$(this).closest('#header').find('#department-button-container').slideUp();
		else
			$(this).closest('#header').find('#department-button-container').slideDown();
	});

});
 