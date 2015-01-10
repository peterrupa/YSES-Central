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
          var postClass;
          switch(res["department"]){
            case "Senior Projects and Activities": postClass = "PAD";
                  break;
            case "Junior Projects and Activities": postClass = "JPAD";
                  break;
            case "Visuals and Logistics": postClass = "VL";
                  break;
            case "Human Resources": postClass = "HR";
                  break;
            case "Finance": postClass = "Fin";
                  break;
            case "Scholastics": postClass = "Scho";
                  break;
            case "Secretariat": postClass = "Sec";
                  break;
            case "Executive": postClass = "Exec";
                  break;
          }
          //convert newline to breaks
          paragraph = $("#logbook-input").val().replace(/\n/g,"<br>");
          var temphtml = ''+
            '<li>'+
              '<div class="post post-'+postClass+'">'+
                '<button class="close hoverClose" type="button" aria-hidden="true">&times;</button>'+
                '<div class="row">'+
                  '<a href="http://localhost:8080/profile/'+res["username"]+'"><img class="mini-pic" src="'+res["picture"]+'"></a>'+
                  '<h3 class="title"><a href="http://localhost:8080/profile/'+res["username"]+'">'+res["first_name"]+'</a></h3>'+
                  '<p class="date">'+res["date"]+'</p>'+
                '</div>'+
                '<div class"row">'+
                  '<p>'+paragraph+'</p>'+
                '</div>'+
              '</div>'+
            '</li>';
          $("#logbook").prepend(temphtml);
          $("#logbook-input").val("");
          $("#logbookModal").modal("hide");
          $('#counter').text(charLimit+' characters left ');
          $('#counter').removeClass("overlimit");
        	$('#counter').removeClass("warning");

          logbookIndex++;

          alert("INSERT SUCCESS PROMPT/MODAL/WHATEVER HERE"); //do what this alert says.
        },
  			error: function (e){
  				console.dir(e);
  			}
  		});
  })
});
