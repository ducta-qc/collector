import {ENDPOINTS} from './Endpoints'

var getRawSentence = function (callback){
	$.ajax({
		type: ENDPOINTS.fetchRawSen.type,
		url:ENDPOINTS.fetchRawSen.url,
		data:{},
		success: function(msg){
			callback(msg);
		},
		error: function(xhr, textStatus, error){
			console.log("Cannot get a raw sentence");
		}
	})	
};

var nerAPI = {
	getRawSentence: getRawSentence
};

export{nerAPI}
