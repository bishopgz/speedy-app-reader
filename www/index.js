$(function(){
	
	
	/* defines */
	var textArray;
	var inputLength;
	var reading = false;
	var frequency = 1000;
	var counter;
	var action;

	$('#new').hide();
	$('#resume').hide();
	$('#pause').hide();
	$('#controls').hide();
	$('#result').hide();
	$('#error').hide();
	 
	 
	$('#start').click(function(){
		textArray = $('#userInput').val().split(/\s+/);
		inputLength = textArray.length;
		if (inputLength > 1){
			reading = true;
			$('#start').hide();
			$('#error').hide();
			$('#userInput').hide();
			$('#new').show();
			$('#pause').show();
			$('#controls').show();
			$('#progressSlider').attr('max', inputLength - 1);
			counter = 0;
			$('#result').show();
			$('#result').text(textArray[counter]);
			
			//interval 
			action = setInterval(read, frequency);
			
			
		} else {
			//show error message
			$('#error').show();
		}
	});
	
	$('#new').click(function(){
		location.reload();
	});
	
	$('#pause').click(function(){
		clearInterval(action);
		reading = false;
		$('#pause').hide();
		$('#resume').show();
		
	});
	
	$('#resume').click(function(){
		action = setInterval(read, frequency);
		reading = true;
		$('#pause').show();
		$('#resume').hide();
	});

	
	$('#fontSizeSlider').on('slidestop', function(event, ui){
		$('#fontSizeSlider').slider('refresh');
		var sliderValue = parseInt($('#fontSizeSlider').val());
		$('#result').css('fontSize', sliderValue);
		$('#fontSizeS').text(sliderValue);
	});
	
	
	
	$('#speedSlider').on('slidestop', function(event, ui){
		$('#speedSlider').slider('refresh');
		var speedValue = parseInt($('#speedSlider').val());
		$('#speed').text(speedValue);
		clearInterval(action);
		frequency = 60000/speedValue;
		if (reading){
			action = setInterval(read, frequency);
		}
	});
	
	
	$('#progressSlider').on('slidestop', function(event, ui){
		$('#progressSlider').slider('refresh');
		var progressValue = parseInt($('#progressSlider').val());
		clearInterval(action);
		counter = progressValue;
		$('#result').text(textArray[counter]);
		$('#progress').text(Math.floor(counter / (inputLength - 1) * 100));
		
		if (reading){
			action = setInterval(read, frequency);
		}
	});
	
	
	
	
	function read(){
		if (counter == inputLength - 1){
			clearInterval(action);
			reading = false;
			$('#pause').hide();
		} else {
			counter++;
			$('#result').text(textArray[counter]);
			$('#progressSlider').val(counter).slider('refresh');
			$('#progress').text(Math.floor(counter / (inputLength - 1) * 100));
		}
	}
	 
});