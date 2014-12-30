$(document).ready(function(){
  $.ajax({
    url: "http://localhost:8080/getYSERs",
    data: "sort=ASC&filterBatch=Charter;RAMpage&filterClass=Active;Inactive;Alumni",
    type: "GET",
    success: function (res) {
      for(batch in res){
        var batchHTML= "";
        for(var i = 0; i < res[batch].length; i++){
          var memberHTML = '<div class="col-lg-2 col-md-2 col-sm-4 col-xs-4"><a class="ajax" href="http://localhost:8080/profile/'+res[batch][i]["first_name"]+'"><div class="pic"><img class="img-responsive" src="http://localhost:8080/'+res[batch][i]["picture"]+'"><div class="btm-label"><div class="btm-label-gradient"></div><div class="btm-label-text"><p>'+res[batch][i]["full_name"]+'</p><p>'+res[batch][i]["org_class"]+'</p></div></div></div></a></div>';
          batchHTML += memberHTML;
        }
          //append here per batch
          $("#result").append("<div class='clearfix'></div><p class='sort-label'>"+batch+"</p>"+batchHTML);
      }
    },
    error: function (e){
      console.dir(e);
    }
  });

  $('body').on('mouseenter','.pic',function(){
    $(this).find('.btm-label').fadeIn(150);
  });
  $('body').on('mouseleave','.pic',function(){
    $(this).find('.btm-label').fadeOut(150);
  });

});
