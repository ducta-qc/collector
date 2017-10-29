import {ENDPOINTS} from './Endpoints'
var $ = require('jquery');

var getRawSentence = function (data, callback, errCb){
  $.ajax({
    type: ENDPOINTS.fetchRawSen.type,
    url: ENDPOINTS.fetchRawSen.url,
    contentType: ENDPOINTS.fetchRawSen.contentType,
    dataType: ENDPOINTS.fetchRawSen.dataType,
    data: JSON.stringify(data),
    success: function(msg){
      callback(msg);
    },
    error: function(xhr, textStatus, error){
      if (typeof errCb !== 'undefined'){
        errCb(xhr.responseJSON);
      }
    }
  })  
};

var importTaggedSentence = function (data, callback, errCb){
  $.ajax({
    type: ENDPOINTS.importTaggedSen.type,
    url: ENDPOINTS.importTaggedSen.url,
    contentType: ENDPOINTS.importTaggedSen.contentType,
    dataType: ENDPOINTS.fetchRawSen.dataType,
    data: JSON.stringify(data),
    success: function(msg){
      console.log('callback');
      callback(msg);
    },
    error: function(xhr, textStatus, error){
      if (typeof errCb !== 'undefined'){
        errCb(xhr.responseJSON);
      }
    }
  })
};

var nerAPI = {
  getRawSentence: getRawSentence,
  importTaggedSentence: importTaggedSentence
};

export{nerAPI}
