$(document).ready(function(){
  //add event
  $('body').off('click','#postAddEvent');
  $('body').on('click','#postAddEvent',function(){
    //set button to loading
    $(this).button('loading');

    //validate fields
    if($("#title").val() == "" || $("#date").val() == ""){
      alert("Insert error here, missing values on title/date");
      return;
    }

    //initialize send object
    var send = {
      name: $("#title").val(),
      date: $("#date").val(),
      attendees: []
    }

    //fetch checked values
    $("#addEventModal").find("tr[data-name]").each(function(){
      if($(this).find("input:checked").length > 0){
        send.attendees.push($(this).data("name"));
      }
    });

    //send data to server
    $.ajax({
      url: "http://localhost:8080/spadattendance/newevent",
      data: JSON.stringify(send),
      contentType: "application/json",
      type: "POST",
      success: function(){
        //remove modal open class in body
        $("body").removeClass("modal-open")
      },
      error: function (e){
        alert("An error has occured. Also beautify this error message with something else not an alert.");
        console.dir(e);
      }
    });
  });

  //edit event
  $('body').off('click','.edit');
  $('body').on('click','.edit',function(){

    var temphtml = '';

    $('.attendance-result').each(function(){

      if( $(this).children().hasClass('glyphicon-ok') ){
        temphtml = ''+
          '<input type="checkbox" value="attended" checked="checked">';
      }
      else if( $(this).children().hasClass('glyphicon-remove') ){
        temphtml = ''+
          '<input type="checkbox" value="attended">';
      }

      $(this).html(temphtml);

    });

    $(this).html('Done with edit');
    $(this).addClass('done');
    $(this).removeClass('edit');

  });

  $('body').off('click','.done');
  $('body').on('click','.done',function(){
    //set loading
    $(this).button('loading');

    var send = [];

    $(".jpadrow").each(function(){
      var jpadster = {
        name: $(this).data('name'),
        events: []
      };

      $(this).children('.attendance-result').each(function(){
        var temp = {
          name: $(this).data('event')
        };

        if($(this).find('input:checked').length > 0){
          temp["value"] = true;
        }
        else{
          temp["value"] = false;
        }

        jpadster["events"].push(temp);
      });

      send.push(jpadster);
    });

    //send data to server
    $.ajax({
      url: "http://localhost:8080/spadattendance/updateattendance",
      data: JSON.stringify({data:send}),
      contentType: "application/json",
      type: "POST",
      error: function (e){
        console.dir(e);
      }
    });

 });

 //remove event
 $('body').off('click','.removeEventButton');
 $('body').on('click','.removeEventButton',function(e){
   e.preventDefault();

   //send data to server
   $.ajax({
     url: "http://localhost:8080/spadattendance/removeevent",
     data: {name:$(this).text()},
     type: "POST",
     error: function (e){
       console.dir(e);
     }
   });
 });

  socket.off('spadattendanceedit');
  socket.on('spadattendanceedit',function(){
    //request to server for data update
    $.ajax({
      url: "http://localhost:8080/spadattendance/content",
      type: "GET",
      success: function(res){
        $("#content").html(res);
      },
      error: function (e){
        console.dir(e);
      }
    });
  });

});
