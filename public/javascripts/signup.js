$(document).ready(function(){
	var numberOfMentees = 1;
	$("#mentees").on('click','.mentee-field .add-mentee',function(){
		var newfield = '<div class="mentee-field"><input class="mentee-textfield" type="text" name="mentee-'+ ++numberOfMentees +'"><input class="add-mentee" type="button" value="Add"></div>'
		$(this).val('Remove');
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
		$(this).parent().remove();
		
		numberOfMentees--;
	});
});

