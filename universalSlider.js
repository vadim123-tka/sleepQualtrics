
src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/9.2.0/nouislider.min.js"




function universalSlider() {

	var basicName = document.getElementById('basicName').innerHTML;
	console.log("basicName", basicName);
	
	var occupationName = document.getElementById('occupationName').innerHTML;
	console.log("occupationName", occupationName);

	
	var suffixName = document.getElementById('suffixName').innerHTML;
	console.log("suffixName", suffixName);
	
	
	//basicName = "Asleep";
	//basicName = "Wakeup";
	//basicName = "LastMeal";
	//basicName = "FirstMeal";

	//occupationName = "Work";
	//occupationName = "Free";

	//suffixName = "Pre";
	
	my_time_ID = createEmbeddedName(basicName, occupationName, suffixName)
	my_time_ID_min = createEmbeddedNameMinutes(basicName, occupationName, suffixName)

	console.log("my_time_ID", my_time_ID)
	
	//my_time_ID = "Asleep_Work";
	
	// retrieve Language of the survey
	var lang = "${e://Field/Q_Language}";
	
	if(lang=="HE") {
  		time_text_Morning = "בוקר";
		time_text_Night = "לילה";
		time_text_Day = "צהריים";
		time_text_Evening = "ערב";
	}
	
	if(lang=="EN") {
		time_text_Morning = "Morning";
		time_text_Night = "Night";
		time_text_Day = "Day";
		time_text_Evening = "Evening";
	}
	
	//var simpletext = document.getElementById('para').innerHTML;
	//console.log("simpletext", simpletext);

	
	var slider = document.getElementById("slider");
	//document.getElementById("my_time_ID").innerHTML  = my_time_ID

	// 0 = initial minutes from start of day
	// 1440 = maximum minutes in a day
	// step: 30 = amount of minutes to step by. 
	var initialStartMinute = 18*60,
		initialEndMinute = 18*60 + 1440-15,
		step = 15;
	
	slider = noUiSlider.create(slider,{
		tooltips: true,
		start:[0],
		orientation: 'vertical',
		step:step,
		tooltips:[true],		
		range:{
			'min':initialStartMinute,
			'max':initialEndMinute,
		},		
		format: {
			// 'to' the formatted value. Receives a number.
			to: function (value) {
				return convertValueToTime(value);
			},
			// 'from' the formatted value.
			// Receives a string, should return a number.
			from: function (value) {
				return value;
			}
		},			
	});

	
	slider.on('slide',function(values,handle){
		slider_value = values[0];
		time_value = values[0].split(" ")[0];
		time_value_in_minutes = convertTimeStringToMinutes(time_value);
		
		Qualtrics.SurveyEngine.setEmbeddedData(my_time_ID, time_value);
		console.log("time_value =", time_value, "written to embedded variable", my_time_ID );

		Qualtrics.SurveyEngine.setEmbeddedData(my_time_ID_min, time_value_in_minutes);
		console.log("time_value in minutes =", time_value_in_minutes, "written to embedded variable", my_time_ID_min );


		//enable NextButton only when slider's handle was moved
		jQuery('#NextButton').show();
	});

	function convertValueToTime(value) {
		     value = Math.round(value);
			 hrs = Math.floor(value/60) % 24;
			 min = value % 60;
			 if ( min == 0) {
					min = "00"
			 };
			 switch  ( hrs) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
					timeText = time_text_Night;
					break;
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
					timeText = time_text_Morning;
					break;
				case 12:
				case 13:
				case 14:				
				case 15:
				case 16:
				case 17:
					timeText = time_text_Day;
					break;
				case 18:
				case 19:
				case 20:				
				case 21:
				case 22:
				case 23:
					timeText = time_text_Evening;
					break;	
					
			 }				 
		time =   hrs + ":" + min + " " + timeText ;
		return time;
	};

	function convertTimeStringToMinutes(value) {
		hours = parseInt(value.split(":")[0]);
		minutes = parseInt(value.split(":")[1]);
			
		total_minutes = hours*60 + minutes ;
		return total_minutes
		
	};
	
	function createEmbeddedName(basicName, occupationName, suffixName) {
		embeddedName = basicName + "_" + occupationName  + "_" + suffixName + "_String";
		return embeddedName;
	};
	
	function createEmbeddedNameMinutes(basicName, occupationName, suffixName) {
		embeddedName = basicName + "_" + occupationName  + "_" + suffixName + "_Min";
		return embeddedName;
	};
}

//simple comment
