$(document).ready( function() {

    $('body').on('mouseenter','.gallery-item', function() {
        $(this).children('.img-title').fadeIn(300);
    }).on('mouseleave','.gallery-item', function() {
      $(this).children('.img-title').fadeOut(100);
    });

});
