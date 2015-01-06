$(document).ready(function(){
	
	$("a.menu-icon-department").click(function(e) {
		e.preventDefault();
		if($(this).closest('#header').find('#department-button-container').is(":visible"))
			$(this).closest('#header').find('#department-button-container').slideUp();
		else
			$(this).closest('#header').find('#department-button-container').slideDown();
	});
});

$(document).mouseup(function (e){
    var container = $("#department-button-container");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.slideUp();
    }
});
 