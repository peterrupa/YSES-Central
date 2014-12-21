$(function() {
		var availableTags = [
			"Almer Mendoza",
			"Marie Bawanan",
			"Peter Rupa",
			"Celyne Zarraga",
			"This is person",
			"Trying to get all letterzz",
			"Hi Hello Wazzup",
			"QWER good game"
		];
		$( "#tags" ).autocomplete({
			source: availableTags
		});
	});