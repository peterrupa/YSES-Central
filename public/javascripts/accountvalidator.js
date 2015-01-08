$(document).ready(function(){
  	$.ajax({
			url: "http://localhost:8080/getPendingAccounts",
			type: "GET",
			success: function(res){
          if(res == "None"){
              $("#temp").append("No pending accounts"); //generate cool html for this
          }
          else{
            for(var i = 0; i < res.length; i++){
              var li = '';
              for(data in res[i]){
                if(data == "mentee"){
                  var temphtml = '';
                  for(var j = 0; j < res[i]["mentee"].length; j++){
                    var temphtml2 = ''+
                      '<li data-mentee>'+
                        res[i]["mentee"][j]+
                      '</li>';
                    temphtml = temphtml.concat(temphtml2);
                  }
                }
                else{
                  var temphtml = ''+
                    '<li data-'+data+'>'+
                      res[i][data]+
                    '</li>'
                }
                li = li.concat(temphtml);
              }
              var html = ''+
                '<li data-username='+res[i]["username"]+'>'+
                  '<ul>'+
                    li+
                  '</ul>'+
                  '<button class="accept">Accept</button>'+
                  '<button class="edit">Edit</button>'+
                  '<button class="reject">Reject</button>'+
                '</li>';
              $("#temp").append(html);
          }
        }
			},
			error: function (e){
				console.dir(e);
			}
		});

    $("body").on("click",".accept",function(){
      //check if there are input boxes
      if($(this).parent().find("input").length > 0){
        $(this).parent().find("input").each(function(index){
          var temphtml = $(this).val();
          $(this).parent().html(temphtml);
        });
      }

      button = $(this);
      //get mentees
      var mentee = [];
      $(this).parent().find($("li[data-mentee]")).each(function(index){
        mentee.push($(this).html());
      });
      $.ajax({
  			url: "http://localhost:8080/acceptAccount",
        data: {origusername:$(this).parent().data("username"),
               username:$(this).parent().find("li[data-username]").html(),
               first_name:$(this).parent().find("li[data-first_name]").html(),
               middle_name:$(this).parent().find("li[data-middle_name]").html(),
               last_name:$(this).parent().find("li[data-last_name]").html(),
               org_class:$(this).parent().find("li[data-org_class]").html(),
               department:$(this).parent().find("li[data-department]").html(),
               studentNumber:$(this).parent().find("li[data-student_number]").html(),
               org_batch:$(this).parent().find("li[data-org_batch]").html(),
               univ_batch:$(this).parent().find("li[data-univ_batch]").html(),
               mentor:$(this).parent().find("li[data-mentor]").html(),
               mentee:mentee,
               bday:$(this).parent().find("li[data-birthday]").html(),
               homeAdd:$(this).parent().find("li[data-home_address]").html(),
               collegeAdd:$(this).parent().find("li[data-college_address]").html(),
               picture:$(this).parent().find("li[data-picture]").html(),
               exec_position:$(this).parent().find("li[data-exec_position]").html()},

  			type: "POST",
  			success: function(res){
          var temphtml = ''+
            '<ul>'+
              '<li>'+
                'Account '+button.parent().data("username")+' accepted.'+
              '</li>'+
            '</ul>';
          button.parent().html(temphtml);
  			},
  			error: function (e){
  				console.dir(e);
  			}
  		});
    });
    $("body").on("click",".reject",function(){
      //check if there are input boxes
      if($(this).parent().find("input").length > 0){
        $(this).parent().find("input").each(function(index){
          var temphtml = $(this).val();
          $(this).parent().html(temphtml);
        });
      }

      button = $(this);
      $.ajax({
        url: "http://localhost:8080/rejectAccount",
        data: {origusername:$(this).parent().data("username"),
               picture:$(this).parent().find("li[data-picture]").html()},
        type: "POST",
        success: function (res){
          var temphtml = ''+
            '<ul>'+
              '<li>'+
                'Account '+button.parent().data("username")+' rejected.'+
              '</li>'+
            '</ul>';
          button.parent().html(temphtml);
        },
        error: function (e){
          console.log(e);
        }
      });
    });
    $("body").on("click",".edit",function(){
      if($(this).parent().find("input").length > 0){
        alert("There are boxes");
      }
      else{
        $(this).parent().find("ul").find("li").each(function(index){
          var temphtml = ''+
            '<input type="text" value="'+$(this).html()+'">';
          $(this).html(temphtml);
        });
      }
    });
});
