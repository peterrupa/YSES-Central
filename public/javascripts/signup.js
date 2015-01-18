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

				// Add the screen to the page.
				$("#preview").append(screen);

				//identify orientation of excess
				var orientation;

				if(img.width<img.height){
					orientation = "portrait";
				}
				else{
					orientation = "landscape"
				}

				var bounds = "<div id='bounds' style='position:absolute'></div>";

				$("#screen").append(bounds);

				$("#bounds").append(img);

				//preview image set up
				if(orientation == "portrait"){
					$("#draggable").width($("#screen").width());
					$("#draggable").height("auto");
				}
				else{
					$("#draggable").width("auto");
					$("#draggable").height($("#screen").height());
				}

				//calculate excess
				var excess;
				if(orientation == "portrait"){
					excess = $("#draggable").height()-$("#screen").height()
				}

				else{
					excess = $("#draggable").width()-$("#screen").width()
				}

				//create div boundary
				var excessDirection, width, height;

				if(orientation == "portrait"){
					width = $("#screen").width();
					height = $("#draggable").height()+excess;
					$("#bounds").css("top","-"+excess+"px").css("width",width+"px").css("height",height+"px");
					$("#draggable").css("top",excess+"px");
				}
				else{
					width = $("#draggable").width()+excess;
					height = $("#screen").height();
					$("#bounds").css("left","-"+excess+"px").css("width",width+"px").css("height",height+"px");
					$("#draggable").css("left",excess/2+"px");
				}

				//assign draggable to element parent
				$("#draggable").addClass("drag-image");

				$("#draggable").draggable({containment:"parent"});
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
				case "Senior Projects and Activities":
					choices = "<option value='Deputy Executve Officer'>Deputy Executive Officer</option><option value='lo'>Liaison Officer</option>";
					break;
				case "Visuals and Logistics":
					choices = "<option value='Visuals and Logistics Head'>Visuals and Logistics Head</option>";
					break;
				case "Secretariat":
					choices = "<option value='Executive Assistant'>Executive Assistant</option>";
					break;
				case "Scholastics":
						choices = "<option value='Scholastics Head'>Scholastics Head</option>";
						break;
				case "Finance":
						choices = "<option value='Finance Head'>Finance Head</option>";
						break;
				case "Human Resources":
						choices = "<option value='Human Resources Head'>Human Resources Head</option>";
						break;
				case "Executive":
						choices = "<option value='Executive Officer'>Executive Officer</option>";
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

		$( ".accountsAutocomplete" ).autocomplete({
			source: availableTags
		});
		$('.accountsAutocomplete').each(function() {
			$(this).autocomplete( "instance" )._renderItem = function (ul, item) {
				return $( "<li>" )
				.append( "<a>" + "<img src='http://localhost:8080/" + item.picture +"' style='width:25px;margin-right:15px;'>" + item.value + "</a>" )
				.appendTo( ul );
			};
		});
	}
	menteesAutocomplete();

	//add/remove mentees
	$("#mentees").on('click','.mentee-field .add-mentee',function(){
		var newfield = '<div class="mentee-field input-group"><input class="mentee-textfield form-control accountsAutocomplete" type="text" name="mentee"><span class="input-group-btn"><button class="add-mentee btn btn-default" type="button"><span class="glyphicon glyphicon-plus"></span></span></div>'
		$(this).append('<span class="glyphicon glyphicon-remove"></span>');
		$(this).find('.glyphicon-plus').remove();
		$(this).removeClass('add-mentee');
		$(this).addClass('remove-mentee');
		$("#mentees").append(newfield);
		menteesAutocomplete();
	});

	$("#mentees").on('click','.mentee-field .remove-mentee',function(){
		$(this).parent().parent().remove();
		menteesAutocomplete();
	});

	$("#photo").on("change",function(){
		createPreview();
	});

	//allows the use of images for input type=file
	$("#upfile1").click(function () {
		$("#photo").trigger('click');
	});

	//onsubmit signup
	$("#signupform").on("submit",function(event){
		event.preventDefault();
		var previewCoordinates = $("#draggable").position();
		var excess;
		//assign crop coordinates
		if($("#draggable").width()<$("#draggable").height()){
			excess = $("#draggable").height()-$("#screen").height();
			var imageCoordinates = {left:previewCoordinates.left,top:previewCoordinates.top-excess};
		}
		else{
			excess = $("#draggable").width()-$("#screen").width()
			var imageCoordinates = {left:previewCoordinates.left-excess,top:previewCoordinates.top};
		}

		//assign university batch from student number
		var univ_batch = $("#signupform input[name='sn-year']").val();

		$(this).ajaxSubmit({
			data: {
				imageCoordinates: imageCoordinates,
			},
			error: function(xhr) {
				console.dir(xhr);
      },
			success: function(res) {
				$("#signupform")[0].reset();
				$("#screen").remove();
				$("#signupModal").modal('hide');
				alert("Insert successful message here!");
			}
		});
	});

	//make this dynamic and for all cases

	$(".input-text").tooltip({
		placement: "right",
		trigger: "focus",
		title: "invalid"
	}).on("keyup", function() {
		var $this = $(this),
		tooltip = $this.next(".tooltip");
		$this.tooltip("show");

		tooltip.find(".tooltip-inner").css({
				backgroundColor: "red",
				color: "black",
				borderColor: "red",
				borderWidth: "1px",
				borderStyle: "solid"
		});

		if(this.value.length == 0) {
			$this.tooltip("show");
		} else {
			$this.tooltip("hide");
		}
	});

	$("#sn-year").tooltip({
		placement: "left",
		trigger: "focus",
		title: "invalid"
	}).on("keyup", function() {
		var $this = $(this),
		tooltip = $this.next(".tooltip");
		$this.tooltip("show");

		tooltip.find(".tooltip-inner").css({
				backgroundColor: "red",
				color: "black",
				borderColor: "red",
				borderWidth: "1px",
				borderStyle: "solid"
		});

		if(this.value.length != 4) {
			$this.tooltip("show");
		} else {
			$this.tooltip("hide");
		}
	});

	$("#sn-number").tooltip({
		placement: "right",
		trigger: "focus",
		title: "invalid"
	}).on("keyup", function() {
		var $this = $(this),
		tooltip = $this.next(".tooltip");
		$this.tooltip("show");

		tooltip.find(".tooltip-inner").css({
				backgroundColor: "red",
				color: "black",
				borderColor: "red",
				borderWidth: "1px",
				borderStyle: "solid"
		});

		if(this.value.length != 5) {
			$this.tooltip("show");
		} else {
			$this.tooltip("hide");
		}
	});

	$("#username").tooltip({
		placement: "right",
		trigger: "focus",
		title: "username already exists"
	}).on("keyup", function() {
		var $this = $(this),
		tooltip = $this.next(".tooltip");
		$this.tooltip("show");

		tooltip.find(".tooltip-inner").css({
				backgroundColor: "red",
				color: "black",
				borderColor: "red",
				borderWidth: "1px",
				borderStyle: "solid"
		});

		if (this.value.length <= 3 && this.value.length > 0) {
			$this.tooltip("show");
		} else {
			$this.tooltip("hide");
		}
	});

	$("#password").tooltip({
		placement: "left",
		trigger: "focus",
		title: "invalid password"
	}).on("keyup", function() {
		var $this = $(this),
		tooltip = $this.next(".tooltip");
		$this.tooltip("show");

		tooltip.find(".tooltip-inner").css({
				backgroundColor: "red",
				color: "black",
				borderColor: "red",
				borderWidth: "1px",
				borderStyle: "solid"
		});

		if (this.value.length <= 3 && this.value.length > 0) {
			$this.tooltip("show");
		} else {
			$this.tooltip("hide");
		}
	});

	$("#retype-password").tooltip({
		placement: "right",
		trigger: "focus",
		title: "password does not match"
	}).on("keyup", function() {
		var $this = $(this),
		tooltip = $this.next(".tooltip");
		$this.tooltip("show");

		tooltip.find(".tooltip-inner").css({
				backgroundColor: "red",
				color: "black",
				borderColor: "red",
				borderWidth: "1px",
				borderStyle: "solid"
		});

		if (this.value.length <= 3 && this.value.length > 0) {
			$this.tooltip("show");
		} else {
			$this.tooltip("hide");
		}
	});

});
