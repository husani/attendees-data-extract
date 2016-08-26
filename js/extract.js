function Extract(callback){

	var dataSource = "./data-source/source.html";

	async.waterfall([_getDataSource, _convert], function(err, results){
		if(err){
			console.log("Unable to extract data from source and convert to JSON.");
		}
		return(callback(err, results));
	})
	
	/**
	 * Load data source via ajax, parse out only what we need
	 */
	function _getDataSource(_waterfallCallback){
		$.ajax({
			url: dataSource,
			method: 'GET',
			success: function(data){
				//we only need HTML for the data we're interested in -- attendees
				return(_waterfallCallback(false, data.split('<body class="archive post-type-archive post-type-archive-attendee">')[1].split("<!-- FOOTER -->")[0]));
			},
			error: function(xhr, status, error){
				console.log(error);
				return(_waterfallCallback(true));
			}
		});
	}
	
	/**
	 * Convert data source to JSON. This is messy, and I don't care.
	 */
	function _convert(rawData, _waterfallCallback){
		//add string, as html, to dom
		var div = document.createElement('div');
		div.id = "buffer";
		div.innerHTML = rawData;

		//append dom object to hidden div		
		var container = document.getElementById('container');
		container.appendChild(div);
		
		//get attendees and parse their data
		var parsedAttendees = [];
		$('div#buffer div.attendee-container').each(function(){
			parsedAttendees.push(_parseAttendeeData($(this)));
		});
		
		return(_waterfallCallback(false, parsedAttendees));

	}

	/**
	 * Parse and return individual attendee data
	 */
	function _parseAttendeeData(dom){
		var attendee = {};

		attendee.imageUrl = $('img.attachment-speakers-featured', dom).attr('src');

		var name = $('h2', dom).text().trim();
		name = name.split(' ');

		attendee.lastName = name.pop();
		attendee.firstName = name.join(' ');
		
		attendee.title = $('h3', dom).text();

		attendee.company = $('h4', dom).text();

		attendee.social = {};
		var social = $('a.attendee-social', dom);
		social.each(function(){
			var link = $(this).attr('href');
			if(link.indexOf('linkedin.com') >= 0){
				attendee.social.linkedin = link;
			}
			if(link.indexOf('twitter.com') >= 0){
				attendee.social.twitter = link;
			}
			if(link.indexOf('facebook.com') >= 0){
				attendee.social.facebook = link;
			}		
		});
		
		return attendee;
	}	
}