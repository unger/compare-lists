$('#clean-button').on('click', function() {

	function CleanArray(arr) {
		for (var i = 0 ; i < arr.length ; i++) {
			var val = jQuery.trim(arr[i].toLowerCase());
			if (val.length > 0) {
				val = val[0].toUpperCase() + val.substring(1, val.length);
			}
			arr[i] = val;
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
			var val1 = arr[j];
			var tabIndex1 = val1.indexOf('\t');
			var val2 = value;
			var tabIndex2 = val2.indexOf('\t');

			if (tabIndex1 !== -1) {
				val1 = val1.substring(0, tabIndex1);
			}
			if (tabIndex2 !== -1) {
				val2 = val2.substring(0, tabIndex2);
			}

			if (val1 === val2) {
				return arr[j];
			}
		}
		return undefined;
	}

	function Combine(input1, input2) {
		var values1 = input1.split('\t');
		var values2 = input2.split('\t');

		if (values2.length > 1) {
			values2.splice(0, 1);
		}

		if (values2.length > 0) {
			return values1.join('\t') + '\t' + values2.join('\t');
		}
		
		return values1.join('\t');
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
		
		var row2 = ArrayContains(text2, val1);
		if (row2 !== undefined) {
			if (ArrayContains(equal, val1) === undefined) {
				equal.push(Combine(val1, row2));
			}
		} else {
			missing2.push(val1);
		}
	}
	
	for (var i = 0 ; i < text2.length ; i++) {
		var val2 = text2[i];
		
		var row1 = ArrayContains(text1, val2);
		if (row1 !== undefined) {
			if (ArrayContains(equal, val2) === undefined) {
				equal.push(Combine(val2, row1));
			}
		} else {
			missing1.push(val2);
		}
	}

	var template = _.template($('#rows-template').html());

	$('#text1section').html(template({headline: 'Missing (' + missing1.length + ')', rows: missing1}));
	$('#text2section').html(template({headline: 'Missing (' + missing2.length + ')', rows: missing2}));
	$('#equalsection').html(template({headline: 'Equal (' + equal.length + ')', rows: equal}));
});


