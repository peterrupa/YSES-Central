$(document).ready( function() {

    $('#box-data .box').on('hover','.gallery-item', function() {
        $(this).find('.img-title').fadeIn(300);
    }, function() {
        $(this).find('.img-title').fadeOut(100);
    });
	
});