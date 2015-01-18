$(document).ready(function(){
	function setOption(batchlist) {
		//determine number of buttons on each side
		var buttonsOnSide = parseInt(batchlist.length/2);

		//set button html
		var buttonHTML = '';

		 if(buttonsOnSide > 0){
		 		var temp1 = '';
		 		for(var i = 0; i < buttonsOnSide; i++){
					var temp = ''+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
							'<label class="btn btn-primary btn-batch disabled">'+
								'<input type="checkbox" name="'+batchlist[i]+'" autocomplete="off" checked><span>'+batchlist[i]+'</span>'+
							'</label>'+
						'</div>';
						temp1 += temp;
		 		}

				temp1 = ''+
					'<div class="col-lg-6">'+
						temp1+
					'</div>';

		 		var temp2 = '';
		 		for(var j = buttonsOnSide; j < (batchlist.length%2!=0?batchlist.length-1:batchlist.length); j++){
					var temp = ''+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
							'<label class="btn btn-primary btn-batch disabled">'+
								'<input type="checkbox" name="'+batchlist[j]+'" autocomplete="off" checked><span>'+batchlist[j]+'</span>'+
							'</label>'+
						'</div>';
						temp2 += temp;
		 		}
				temp2 = ''+
					'<div class="col-lg-6">'+
						temp2+
					'</div>';
				buttonHTML += temp1 + temp2;
		 }
		if(batchlist.length%2 != 0){
			var temp = ''+
				'<div data-toggle="buttons" class="btn-group btn-batch">'+
					'<label class="btn btn-primary btn-batch disabled">'+
						'<input type="checkbox" name="'+batchlist[batchlist.length-1]+'" autocomplete="off" checked><span>'+batchlist[batchlist.length-1]+'</span>'+
					'</label>'+
				'</div>';
			buttonHTML += temp;
		}


		var contentHTML =
		'<p class="dropdown-label-1">Filter</p>'+
		'<div class="col-lg-6">'+
			'<p class="dropdown-label-2">By Batch</p>'+
      '<div class="text-center">'+
  			'<div data-toggle="buttons" class="btn-group All">'+
    			'<label class="btn btn-primary active btn-all">'+
    				'<input id="BatchAll" type="checkbox" autocomplete="off" checked><span>All</span>'+
    			'</label>'+
  			'</div>'+
      '</div>'+
			'<hr/>'+
			'<div class="btn-container">'+
				'<form name="Batch">'+
  			buttonHTML+
      '</div>'+
			'</form>'+
		'</div>'+
		'<div class="col-lg-6">'+
			'<p class="dropdown-label-2">By Classification</p>'+
			'<div class="text-center">'+
  			'<div data-toggle="buttons" class="btn-group All">'+
    			'<label class="btn btn-primary active btn-all">'+
    				'<input id="ClassAll" type="checkbox" autocomplete="off" checked><span>All</span>'+
    			'</label>'+
  			'</div>'+
      '</div>'+
			'<hr/>'+
			'<div class="btn-container">'+
				'<form name="Class">'+
					'<div data-toggle="buttons" class="btn-group btn-batch">'+
						'<label class="btn btn-primary btn-batch disabled">'+
							'<input type="checkbox" name="Active" autocomplete="off" checked><span>Active</span>'+
						'</label>'+
					'</div>'+
					'<div data-toggle="buttons" class="btn-group btn-batch">'+
						'<label class="btn btn-primary btn-batch disabled">'+
							'<input type="checkbox" name="Inactive" autocomplete="off" checked><span>Inactive</span>'+
						'</label>'+
					'</div>'+
					'<div data-toggle="buttons" class="btn-group btn-batch">'+
						'<label class="btn btn-primary btn-batch disabled">'+
							'<input type="checkbox" name="Alumni" autocomplete="off" checked><span>Alumni</span>'+
						'</label>'+
					'</div>'+
				'</form>'+
			'</div>'+
		'</div>'+
		'<div class="clearfix"></div>'+
		'<p class="dropdown-label-1" style="margin-top:10px;">Sort</p>'+
		'<div class="col-lg-6 text-center">'+
			'<div class="btn-group" data-toggle="buttons">'+
			  '<label class="btn btn-primary active">'+
			    '<input type="radio" name="sort" id="asc" autocomplete="off" value="Ascending" checked> Ascending'+
			  '</label>'+
			  '<label class="btn btn-primary">'+
			    '<input type="radio" name="sort" id="desc" autocomplete="off" value="Descending"> Descending'+
			  '</label>'+
			'</div>'+
		'</div>'+
		'<div class="clearfix"></div>'+
		'<button type="button" id="optionsSubmit" data-loading-text="Wait..." class="btn btn-primary pull-right" autocomplete="off">'+
		  'Go'+
		'</button>'+
		'<div class="clearfix"></div>';

		$('[data-toggle="popover"]').popover({
      html: true,
			container: $("#buttonOptions").parent(),
			content: contentHTML
		});
	}

	function doOption(sort,batch,org_class,callback){
		$.ajax({
			url: "http://localhost:8080/getYSERs",
			data: "data="+JSON.stringify({sort:sort,batch:batch,org_class:org_class}),
			type: "GET",
			success: function (res) {
				res = safe_tags(res);
				//clear element
				 $("#result").empty();

				for(var i = 0; i < res.length; i++){
					var batchHTML = '';

					for(var j = 0; j < res[i]["data"].length; j++){
						var memberHTML = ''+
						'<div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">'+
							'<a class="ajax" href="http://localhost:8080/profile/'+res[i]["data"][j]["username"]+'">'+
								'<div class="pic">'+
									'<img class="img-responsive" src="http://localhost:8080/'+res[i]["data"][j]["picture"]+'">'+
									'<div class="btm-label">'+
										'<div class="btm-label-gradient"></div>'+
										'<div class="btm-label-text">'+
											'<p>'+res[i]["data"][j]["full_name"]+'</p>'+
											'<p>'+res[i]["data"][j]["org_class"]+'</p>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</a>'+
						'</div>';

						batchHTML += memberHTML;
					}

					$("#result").append("<div class='clearfix'></div><p class='sort-label'>"+res[i]["batch"]+"</p>"+batchHTML);
				}

				//set result batch text
				var batchtext = '';

				for(var i = 0; i < batch.length; i++){
					batchtext += i==0?batch[i]:", "+batch[i];
				}

				//set result class text
				var classtext = '';

				for(var i = 0; i < org_class.length; i++){
					classtext += i==0?org_class[i]:", "+org_class[i];
				}

				//change result text
				$("#resultText").text("Result for batch: \""+batchtext+"\", classification: \""+classtext+"\", sorted "+(sort=='ASC'?"ascending":"descending")+".");

				 if(callback){
				 	callback();
				 }
			},
			error: function (e){
				console.dir(e);
			}
		});
	}

	//fetch batch list
	$.ajax({
		url: "http://localhost:8080/getBatch",
		type: "GET",
		success: function (res) {
			//console.log(res);
			setOption(res);
			doOption("ASC",res,["Active","Inactive","Alumni"]);
		},
		error: function (e){
			console.dir(e);
		}
	});

	$("body").off("click",".btn-all");
	$("body").on("click",".btn-all",function(){
		if($(this).hasClass('active')){
			$(this).find("input").prop("checked",false);
			$(this).parent().parent().parent().find("form").find("label").removeClass("disabled");
			$(this).parent().parent().parent().find("form").find("label").removeClass("active");
			$(this).parent().parent().parent().find("form").find("input").prop("checked",false);
		}
		else{
			$(this).find("input").prop("checked",true);
			$(this).parent().parent().parent().find("form").find("label").addClass("disabled");
			$(this).parent().parent().parent().find("form").find("label").addClass("active");
			$(this).parent().parent().parent().find("form").find("input").prop("checked",true);
		}
	});

	$("body").off("click","label.btn-batch");
	$("body").on("click","label.btn-batch",function(){
		if($(this).children('input').prop("checked") == true){
			$(this).children('input').prop("checked",false);
		}
		else{
			$(this).children('input').prop("checked",true);
		}
	});

	$("body").off("click","#optionsSubmit");
	$("body").on("click","#optionsSubmit",function(){
		var $btn = $(this).button('loading');

		//get checked checkboxes, batch
		var batches = [];
		for(var i = 0; i < document.forms["Batch"].elements.length; i++){
			if(document.forms["Batch"].elements[i].checked == true){
				batches.push(document.forms["Batch"].elements[i].name);
			}
		}
		//get checked checkboxes, class
		var classes = [];
		for(var i = 0; i < document.forms["Class"].elements.length; i++){
			if(document.forms["Class"].elements[i].checked == true){
				classes.push(document.forms["Class"].elements[i].name);
			}
		}
		//get sort
		var sort;
		if($("input[name='sort']:checked").val() == "Ascending"){
			sort = 'ASC';
		}
		else{
			sort = 'DESC';
		}

		//send ajax request
    doOption(sort,batches,classes,function(){
			$btn.button('reset');
			$('[data-toggle="popover"]').popover('hide');
		});
	});

	$('body').off('mouseenter','.pic');
	$('body').on('mouseenter','.pic',function(){
		$(this).find('.btm-label').fadeIn(150);
	});
	$('body').off('mouseleave','.pic');
	$('body').on('mouseleave','.pic',function(){
		$(this).find('.btm-label').fadeOut(150);
	});

});
