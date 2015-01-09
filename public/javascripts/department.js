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
			$(this).find('ul').slideDown(500);
		}, function() {
			$(this).find('ul').slideUp(300);
		}
	);
	$('.gallery-item').hover( 
		function() {
			$(this).find('.img-title').fadeIn(200);
		}, function() {
			$(this).find('.img-title').fadeOut(100);
		}
	);

	// will check how many character/s left in textarea
	$('#logbook-input').keyup(function () {
		var left = 120 - $(this).val().length;
		if(left <= 0){
            $(this).closest('.modal-content').find('#counter').addClass("overlimit");
        	$(this).closest('.modal-content').find('#counter').removeClass("warning");
        }
        else if(left > 0 && left < 30){
        	$(this).closest('.modal-content').find('#counter').addClass("warning");
        	$(this).closest('.modal-content').find('#counter').removeClass("overlimit");
        }
        else if(left >= 30){
            $(this).closest('.modal-content').find('#counter').removeClass("overlimit");
        	$(this).closest('.modal-content').find('#counter').removeClass("warning");
        }
		$(this).closest('.modal-content').find('#counter').text(left + ' characters left ');
	});

	// on click outside department button container, will toggle visibility
});

$(document).mouseup(function (e){
    var container = $("#department-button-container");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.slideUp();
    }
});