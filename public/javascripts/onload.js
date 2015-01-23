$(document).ready(function(){
  $.ajax({
    url: (location.pathname=="/"?"":location.pathname)+"/content",
    type: "GET",
    success: function (res) {
      $("#content").html(res);
      $("body").scrollTop(0);
    },
    error : function(jqXHR, textStatus, errorThrown) {
      if(jqXHR.status == 404 || errorThrown == 'Not Found'){
        alert('There was a 404 error.');
      }
    }
  });
});
