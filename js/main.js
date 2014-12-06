$('#clean-button').on('click', function() {

	function CleanArray(arr) {
		for (var i = 0 ; i < arr.length ; i++) {
			var val = arr[i];
			
			val = val.replace(/\d*/, '');
			
			arr[i] = jQuery.trim(val.toLowerCase());
		}
	}


	var text1 = $('#text1').val().split('\n');
	var text2 = $('#text2').val().split('\n');

	CleanArray(text1);
	CleanArray(text2);

	$('#text1').val(text1.join('\n'));
	$('#text2').val(text2.join('\n'));
});
	
$('#compare-button').on('click', function() {

	function ArrayContains(arr, value) {
		for (var j = 0 ; j < arr.length ; j++) {
			if (arr[j] === value) {
				return true;
			}
		}
		return false;
	}

	var text1 = $('#text1').val().split("\n");
	var text2 = $('#text2').val().split("\n");
	
	var missing1 = [];
	var missing2 = [];
	var equal = [];
	
	for (var i = 0 ; i < text1.length ; i++) {
		var val1 = text1[i];
		
		if (ArrayContains(text2, val1)) {
			if (!ArrayContains(equal, val1)) {
				equal.push(val1);
			}
		} else {
			missing2.push(val1);
		}
	}
	
	for (var i = 0 ; i < text2.length ; i++) {
		var val2 = text2[i];
		
		if (ArrayContains(text1, val2)) {
			if (!ArrayContains(equal, val2)) {
				equal.push(val2);
			}
		} else {
			missing1.push(val2);
		}
	}

	var template = _.template($('#missing-template').html());

	$('#text1section').html(template({missing: missing1}));
	$('#text2section').html(template({missing: missing2}));
});


