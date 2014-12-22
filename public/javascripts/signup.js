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
	//add/remove mentees
	var numberOfMentees = 1;
	$("#mentees").on('click','.mentee-field .add-mentee',function(){
		var newfield = '<div class="mentee-field input-group"><input class="mentee-textfield form-control" type="text" name="mentee-'+ ++numberOfMentees +'"><span class="input-group-btn"><button class="add-mentee btn btn-default" type="button"><span class="glyphicon glyphicon-plus"></span></span></div>'
		$(this).append('<span class="glyphicon glyphicon-remove"></span>');
		$(this).find('.glyphicon-plus').remove();
		$(this).removeClass('add-mentee');
		$(this).addClass('remove-mentee');
		$("#mentees").append(newfield);
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

		numberOfMentees--;
	});

	$("#photo").on("change",function(){
		createPreview();
	});

	//onsubmit login
	$("#loginform").on("submit",function(){
		//alert($("#loginform input[name='password']").val());
		$("#loginform input[name='password']").val(String(CryptoJS.SHA3($("#loginform input[name='password']").val(),{ outputLength: 224 })));
	});

	//onsubmit signup
	$("#signupform").on("submit",function(){
		var previewCoordinates = $("#draggable").position();

		$("#imageleft").val(previewCoordinates.left);
		$("#imagetop").val(previewCoordinates.top);
		$("#numberofmentees").val(numberOfMentees);
		//encrypt password
		$("#signupform input[name='password']").val(String(CryptoJS.SHA3($("#signupform input[name='password']").val(),{ outputLength: 224 })));

		if($(".mentee-textfield[name='mentee-1']").val() == "" && numberOfMentees == 1){
			$("#numberofmentees").val(0);
		}

	});
});
