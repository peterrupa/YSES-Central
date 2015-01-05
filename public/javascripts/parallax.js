$(document).ready(function(){
	$(window).scroll(function() {
		var yPos = ($(window).scrollTop() / $('body').data('speed'));

		// Put together our final background position
		var coords = '50% '+ yPos + 'px';

		// Move the background
		$('body').css({ backgroundPosition: coords });
	});

	//smooth scroll

	//it fucks up modals so it's disbaled for a meanwhile

	// $(function () {
  //   $.srSmoothscroll({
  //       // defaults
  //       step: 75,
  //       speed: 100,
  //       ease: 'linear'
  //   });
	//
	// });
});
