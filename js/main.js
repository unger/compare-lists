$('#clean-button').on('click', function() {

	function CleanArray(arr) {
		for (var i = 0 ; i < arr.length ; i++) {
			var val = arr[i];
			val = val.replace(/\d*/, '');
			arr[i] = jQuery.trim(val.toLowerCase());
		}
		for (var i = arr.length-1 ; i >= 0 ; i--) {
			if (arr[i] === '') {
				arr.splice(i, 1);
			}
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
	
	$('#text1').next('div').remove();
	$('#text2').next('div').remove();
	
	$('#text1').after('<div>Total: ' + text1.length + '</div>');
	$('#text2').after('<div>Total: ' + text2.length + '</div>');
	
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

	var template = _.template($('#rows-template').html());

	$('#text1section').html(template({headline: 'Missing', rows: missing1}));
	$('#text2section').html(template({headline: 'Missing', rows: missing2}));
	$('#equalsection').html(template({headline: 'Equal', rows: equal}));
});


