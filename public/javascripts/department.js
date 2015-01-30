$(document).ready(function(){

	// will toggle department button container
	$("a.menu-icon-department").click(function(e) {
		e.preventDefault();
		if($(this).closest('#header').find('#department-button-container').is(":visible"))
			$(this).closest('#header').find('#department-button-container').slideUp();
		else
			$(this).closest('#header').find('#department-button-container').slideDown();
	});

	// hover animation
	$('.gallery-item').hover(
		function() {
			$(this).find('.img-title').fadeIn(200);
		}, function() {
			$(this).find('.img-title').fadeOut(100);
		}
	);
	$('.link').on('click',
		function() {
			if($(this).find('.wheel').is(':visible') != 0){
				$(this).find('.wheel').slideUp(500);
			} else {
				$(this).find('.wheel').slideDown(500);
			}
		}
	);

	// on click outside department button container, will toggle visibility
	$(document).mouseup(function (e){
	    var container = $("#department-button-container");

	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
	        container.slideUp();
	    }
	});

	$(document).click(function (e){
	    var container = $(".link");

	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
	        container.find('.wheel').slideUp();
	    }
	});
});