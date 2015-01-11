$(document).ready(function(){

  var charLimit = 1000; //the limit for characters, use this variable instead to change
  $('#logbook-input').attr("maxlength",charLimit);

  $("#counter").text(charLimit+" character"+(charLimit==1?"":"s")+" left.");

  logbookIndex = 0 //number of current logbook entries displayed. initialized at zero

  // will check how many character/s left in textarea
	$('#logbook-input').keyup(function () {
		var left = charLimit - $(this).val().length;

    //fucking carriage return. Why does HTML reads newline as \r\n but javascript reads it as \n? Fucking inconsistency. Now I have to come up with this bullshit formula I barely understand
    left -= (($('#logbook-input').val().match(/\n/g) || []).length)*2 - ($('#logbook-input').val().match(/\n/g) || []).length;

		if(left <= 0){
      $('#counter').addClass("overlimit");
    	$('#counter').removeClass("warning");
    }
    else if(left > 0 && left < 30){
    	$('#counter').addClass("warning");
    	$('#counter').removeClass("overlimit");
    }
    else if(left >= 30){
      $('#counter').removeClass("overlimit");
    	$('#counter').removeClass("warning");
    }
		$('#counter').text(left+" character"+(left==1?"":"s")+" left.");
	});

  $("body").on("click","#postLogbook",function(){
    var button = $(this);
    	$.ajax({
  			url: "http://localhost:8080/postLogbook",
        data: {message:$("#logbook-input").val()},
  			type: "POST",
  			success: function(res){
          $("#logbook-input").val("");
          $("#logbookModal").modal("hide");
          $('#counter').text(charLimit+' characters left ');
          $('#counter').removeClass("overlimit");
        	$('#counter').removeClass("warning");

          alert("INSERT SUCCESS PROMPT/MODAL/WHATEVER HERE"); //do what this alert says.
        },
  			error: function (e){
  				console.dir(e);
  			}
  		});
  })
});
