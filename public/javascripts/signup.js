$(document).ready(function(){
	var numberOfMentees = 1;
	$("#mentees").on('click','.mentee-field .add-mentee',function(){
		var newfield = '<div class="mentee-field input-group"><input class="mentee-textfield form-control" type="text" name="mentee-'+ ++numberOfMentees +'"><span class="input-group-btn"><button class="add-mentee btn btn-default" type="button"><span class="glyphicon glyphicon-plus"></span></span></div>'
		$(this).append('<span class="glyphicon glyphicon-remove"></span>');
		$(this).find('glyphicon-plus').remove();
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
});
