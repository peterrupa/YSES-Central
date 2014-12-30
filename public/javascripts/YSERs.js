$(document).ready(function(){
	$(function () {
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
  			'<div class="col-lg-6">'+
            '<div data-toggle="buttons" class="btn-group btn-batch">'+
              '<label class="btn btn-primary btn-batch disabled">'+
                '<input type="checkbox" name="Charter" autocomplete="off" checked><span>Charter</span>'+
              '</label>'+
            '</div>'+
            '<div data-toggle="buttons" class="btn-group btn-batch">'+
              '<label class="btn btn-primary btn-batch disabled">'+
                '<input type="checkbox" name="Synergy" autocomplete="off" checked><span>Synergy</span>'+
              '</label>'+
            '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
              '<label class="btn btn-primary btn-batch disabled">'+
                '<input type="checkbox" name="Nidaime Quatro" autocomplete="off" checked><span>Nidaime Quatro</span>'+
              '</label>'+
            '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
              '<label class="btn btn-primary btn-batch disabled">'+
                '<input type="checkbox" name="Gitara" autocomplete="off" checked><span>Gitara</span>'+
              '</label>'+
            '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
              '<label class="btn btn-primary btn-batch disabled">'+
                '<input type="checkbox" name="Ecclesiastes 4:9" autocomplete="off" checked><span>Ecclesiastes 4:9</span>'+
              '</label>'+
            '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
              '<label class="btn btn-primary btn-batch disabled">'+
                '<input type="checkbox" name="Bato Balani" autocomplete="off" checked><span>Bato Balani</span>'+
              '</label>'+
            '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
              '<label class="btn btn-primary btn-batch disabled">'+
                '<input type="checkbox" name="Dyeese" autocomplete="off" checked><span>Dyeese</span>'+
              '</label>'+
            '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
              '<label class="btn btn-primary btn-batch disabled">'+
                '<input type="checkbox" name="Century" autocomplete="off" checked><span>Century</span>'+
              '</label>'+
            '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
              '<label class="btn btn-primary btn-batch disabled">'+
                '<input type="checkbox" name="Quadfore" autocomplete="off" checked><span>Quadfore</span>'+
              '</label>'+
            '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
              '<label class="btn btn-primary btn-batch disabled">'+
                '<input type="checkbox" name="13EST ©" autocomplete="off" checked><span>13EST ©</span>'+
              '</label>'+
            '</div>'+
  			'</div>'+
  			'<div class="col-lg-6">'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
							'<label class="btn btn-primary btn-batch disabled">'+
								'<input type="checkbox" name="Divide Et Impera X" autocomplete="off" checked><span>Divide Et Impera X</span>'+
							'</label>'+
						'</div>'+
	  				'<div data-toggle="buttons" class="btn-group btn-batch">'+
	            '<label class="btn btn-primary btn-batch disabled">'+
	              '<input type="checkbox" name="BoltXV" autocomplete="off" checked><span>BoltXV</span>'+
	            '</label>'+
	          '</div>'+
	          '<div data-toggle="buttons" class="btn-group btn-batch">'+
	            '<label class="btn btn-primary btn-batch disabled">'+
	              '<input type="checkbox" name="+0- Net Charge" autocomplete="off" checked><span>+0- Net Charge</span>'+
	            '</label>'+
	          '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
	            '<label class="btn btn-primary btn-batch disabled">'+
	              '<input type="checkbox" name="Aglet" autocomplete="off" checked><span>Aglet</span>'+
	            '</label>'+
	          '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
	            '<label class="btn btn-primary btn-batch disabled">'+
	              '<input type="checkbox" name="1\'s Complement" autocomplete="off" checked><span>1\'s Complement</span>'+
	            '</label>'+
	          '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
	            '<label class="btn btn-primary btn-batch disabled">'+
	              '<input type="checkbox" name="Equifinality" autocomplete="off" checked><span>Equifinality</span>'+
	            '</label>'+
	          '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
	            '<label class="btn btn-primary btn-batch disabled">'+
	              '<input type="checkbox" name="Jenga" autocomplete="off" checked><span>Jenga</span>'+
	            '</label>'+
	          '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
	            '<label class="btn btn-primary btn-batch disabled">'+
	              '<input type="checkbox" name="He-4" autocomplete="off" checked><span>He-4</span>'+
	            '</label>'+
	          '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
	            '<label class="btn btn-primary btn-batch disabled">'+
	              '<input type="checkbox" name="RainByte" autocomplete="off" checked><span>RainByte</span>'+
	            '</label>'+
	          '</div>'+
						'<div data-toggle="buttons" class="btn-group btn-batch">'+
	            '<label class="btn btn-primary btn-batch disabled">'+
	              '<input type="checkbox" name="4tified" autocomplete="off" checked><span>4tified</span>'+
	            '</label>'+
	          '</div>'+
		    '</div>'+
				'<div data-toggle="buttons" class="btn-group btn-batch">'+
					'<label class="btn btn-primary btn-batch disabled">'+
						'<input type="checkbox" name="RAMpage" autocomplete="off" checked><span>RAMpage</span>'+
					'</label>'+
				'</div>'+
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
	});
	function doOption(sort,batch,orgclass,callback){
		$.ajax({
			url: "http://localhost:8080/getYSERs",
			data: "sort="+sort+"&filterBatch="+batch+"&filterClass="+orgclass,
			type: "GET",
			success: function (res) {
				console.log(res);

				//clear element
				$("#result").empty();
				
				for(batchName in res){
					if(res[batchName].length > 0){
						var batchHTML= "";
						for(var i = 0; i < res[batchName].length; i++){
							var memberHTML = '<div class="col-lg-2 col-md-2 col-sm-4 col-xs-4"><a class="ajax" href="http://localhost:8080/profile/'+res[batchName][i]["first_name"]+'"><div class="pic"><img class="img-responsive" src="http://localhost:8080/'+res[batchName][i]["picture"]+'"><div class="btm-label"><div class="btm-label-gradient"></div><div class="btm-label-text"><p>'+res[batchName][i]["full_name"]+'</p><p>'+res[batchName][i]["org_class"]+'</p></div></div></div></a></div>';
							batchHTML += memberHTML;
						}
							//append here per batch
							$("#result").append("<div class='clearfix'></div><p class='sort-label'>"+batchName+"</p>"+batchHTML);
					}
				}

				//set result batch text
				var resultTextBatch = "";
				batch = batch.split(";");
				for(var i = 0; i < batch.length; i++){
					if(resultTextBatch == ""){
						resultTextBatch += batch[i];
					}
					else{
						resultTextBatch += ", "+batch[i];
					}
				}

				//set result class text
				var resultTextClass = "";
				orgclass = orgclass.split(";");
				for(var i = 0; i < orgclass.length; i++){
					if(resultTextClass == ""){
						resultTextClass += orgclass[i];
					}
					else{
						resultTextClass += ", "+orgclass[i];
					}
				}

				//change result text
				$("#resultText").text("Result for batch: \""+resultTextBatch+"\", classification: \""+resultTextClass+"\", sorted "+(sort=='ASC'?"ascending":"descending")+".");

				if(callback){
					callback();
				}
			},
			error: function (e){
				console.dir(e);
			}
		});
	}
	doOption("ASC","Charter;Synergy;Nidaime Quatro;Gitara;Ecclesiastes 4:9;Bato Balani;Dyeese;Century;Quadfore;13EST ©;Divide Et Impera X;BoltXV;+0- Net Charge;Aglet;1\'s Complement;Equifinality;Jenga;He-4;RainByte;4tified;RAMpage","Active;Inactive;Alumni");

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

	$("body").on("click","label.btn-batch",function(){
		if($(this).children('input').prop("checked") == true){
			$(this).children('input').prop("checked",false);
		}
		else{
			$(this).children('input').prop("checked",true);
		}
	});

	$("body").on("click","#optionsSubmit",function(){
		var $btn = $(this).button('loading');

		//get checked checkboxes, batch
		var Batches = "";
		for(var i = 0; i < document.forms["Batch"].elements.length; i++){
			if(document.forms["Batch"].elements[i].checked == true){
				if(Batches == ""){
					Batches += document.forms["Batch"].elements[i].name;
				}
				else{
					Batches += ";"+document.forms["Batch"].elements[i].name;
				}
			}
		}
		//get checked checkboxes, class
		var Classes = "";
		for(var i = 0; i < document.forms["Class"].elements.length; i++){
			if(document.forms["Class"].elements[i].checked == true){
				if(Classes == ""){
					Classes += document.forms["Class"].elements[i].name;
				}
				else{
					Classes += ";"+document.forms["Class"].elements[i].name;
				}
			}
		}
		//get sort
		var sort;
		if($("input[name='sort']:checked").val() == "Ascending"){
			sort = 'ASC';
		}
		else{
			sort = 'DESC'
		}

		//send ajax request
    doOption(sort,Batches,Classes,function(){
			$btn.button('reset');
		});
	});

	$('body').on('mouseenter','.pic',function(){
		$(this).find('.btm-label').fadeIn(150);
	});
	$('body').on('mouseleave','.pic',function(){
		$(this).find('.btm-label').fadeOut(150);
	});

});
