$(document).ready( function() {

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

});