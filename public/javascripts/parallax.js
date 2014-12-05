$(document).ready(function(){
	$(window).scroll(function() {
		var yPos = ($(window).scrollTop() / $('body').data('speed'));
		
		// Put together our final background position
		var coords = '50% '+ yPos + 'px';

		// Move the background
		$('body').css({ backgroundPosition: coords });
	});
});