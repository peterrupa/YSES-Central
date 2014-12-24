$(document).ready(function(){
	function createPreview(){
		var file = $("#photo")[0].files[0];
		var imageType = /image.*/;

		$("#preview").empty();

		if (file.type.match(imageType)) {
			var reader = new FileReader();

			reader.onload = function(e) {

			// Create a new image.
			var img = new Image();
			// Set the img src property using the data URL.
			img.src = reader.result;
			img.id = "draggable";
			//create screen
			var screen = "<div id='screen'></div>";

			// Add the image to the page.
			$("#preview").append(screen);
			$("#screen").append(img);
			$("#draggable").addClass("drag-image");
			//preview image set up
			if($("#draggable").width()<$("#draggable").height()){
				$("#draggable").width($("#screen").width());
				$("#draggable").height("auto");
			}
			else{
				$("#draggable").width("auto");
				$("#draggable").height($("#screen").height());
			}
			var xy = $("#screen").offset();
			//be sure to take in account the pixel of the border
			if($("#draggable").width()<=$("#draggable").height()){
				var excess = $("#draggable").height()-$("#screen").height();
				$("#draggable").draggable({containment:[xy.left,xy.top-excess,xy.left,xy.top]});
			}
			else{
				var excess = $("#draggable").width()-$("#screen").width();
				$("#draggable").draggable({containment:[xy.left-excess,xy.top,xy.left,xy.top]});
			}
		  }

		  reader.readAsDataURL(file);

		} else {
		  $("#preview").append("File not supported!");
		}
	}

	//preview image in case browser clicked back
	if($("#photo").val()){
		createPreview();
	}

	function addPosition(){
		if($("#isExec").is(":checked")){
			var choices;
			switch($("select[name='department']").val()){
				case "spad":
					choices = "<option value='deo'>Deputy Executive Officer</option><option value='lo'>Liaison Officer</option>";
					break;
				case "vl":
					choices = "<option value='vlh'>Visuals and Logistics Head</option>";
					break;
				case "sec":
					choices = "<option value='ea'>Executive Assistant</option>";
					break;
				case "scho":
						choices = "<option value='sh'>Scholastics Head</option>";
						break;
				case "fin":
						choices = "<option value='fh'>Finance Head</option>";
						break;
				case "hr":
						choices = "<option value='hrh'>Human Resources Head</option>";
						break;
				case "exec":
						choices = "<option value='eo'>Executive Officer</option>";
						break;
				}
			var insert = "<li id='positions'>Position<br><select class='form-control' form='signupform' name='exec_position'>"+choices+"</select></li>";
			$("#isExec").parent().after(insert);
		}
		else{
			$('#positions').remove();
		}
	}

	//disable exec button if jpad
	$("select[name='department']").on('change',function(){
		if($("select[name='department']").val() == 'jpad'){
			$("#isExec").prop('checked',false);
			$("#isExec").attr('disabled',true);
			if($('#positions').length > 0){
				$('#positions').remove();
			}
		}
		else{
			$("#isExec").removeAttr('disabled');
			if($('#positions').length > 0){
				$('#positions').remove();
			}
			addPosition();
		}
	});

	//is exec box
	$("#isExec").on('change',function(){
		addPosition();
	});

	//autocomplete for mentees
	function menteesAutocomplete(){
		var availableTags = (function(){
			return $.ajax({
				async: false,
				url: "http://localhost:8080/search",
				data: "",
				type: "GET",
				success: function (res) {
					return res;
				},
				error: function (e){
					console.dir(e);
				}
			})["responseJSON"];
		})();

		$( ".mentee-textfield" ).autocomplete({
			source: availableTags
		});
		$('.mentee-textfield').each(function() {
			$(this).autocomplete( "instance" )._renderItem = function (ul, item) {
				return $( "<li>" )
				.append( "<a>" + "<img src='http://localhost:8080/" + item.picture +"' style='width:25px;margin-right:15px;'>" + item.value + "</a>" )
				.appendTo( ul );
			};
		});
	}
	menteesAutocomplete();

	//add/remove mentees
	var numberOfMentees = 1;
	$("#mentees").on('click','.mentee-field .add-mentee',function(){
		var newfield = '<div class="mentee-field input-group"><input class="mentee-textfield form-control" type="text" name="mentee-'+ ++numberOfMentees +'"><span class="input-group-btn"><button class="add-mentee btn btn-default" type="button"><span class="glyphicon glyphicon-plus"></span></span></div>'
		$(this).append('<span class="glyphicon glyphicon-remove"></span>');
		$(this).find('.glyphicon-plus').remove();
		$(this).removeClass('add-mentee');
		$(this).addClass('remove-mentee');
		$("#mentees").append(newfield);
		menteesAutocomplete();
	});
	$("#mentees").on('click','.mentee-field .remove-mentee',function(){
		$(this).parent().nextAll().each(function(index){
			var temp;
			temp = $(this).children(".mentee-textfield").attr("name").substring(7);
			temp = parseInt(temp)-1;
			temp = temp.toString();
			$(this).children(".mentee-textfield").attr("name","mentee-"+temp);
		});
		$(this).parent().parent().remove();
		menteesAutocomplete();

		numberOfMentees--;
	});

	$("#photo").on("change",function(){
		createPreview();
	});

	//onsubmit login
	$("#loginform").on("submit",function(){
		$("#loginform input[name='password']").val(String(CryptoJS.SHA3($("#loginform input[name='password']").val(),{ outputLength: 224 })));
	});

	//onsubmit signup
	$("#signupform").on("submit",function(){
		var previewCoordinates = $("#draggable").position();

		//assign crop coordinates
		$("#imageleft").val(previewCoordinates.left);
		$("#imagetop").val(previewCoordinates.top);

		//assign number of mentees
		$("#numberofmentees").val(numberOfMentees);

		//assign university batch from student number
		$("#univbatch").val($("#signupform input[name='sn-year']").val());

		//encrypt password
		$("#signupform input[name='password']").val(String(CryptoJS.SHA3($("#signupform input[name='password']").val(),{ outputLength: 224 })));

		if($(".mentee-textfield[name='mentee-1']").val() == "" && numberOfMentees == 1){
			$("#numberofmentees").val(0);
		}

	});
});
