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
    dataType: ENDPOINTS.importTaggedSen.dataType,
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

var importUntaggedSentence = function (data, callback, errCb){
  $.ajax({
    type: ENDPOINTS.importUntaggedSen.type,
    url: ENDPOINTS.importUntaggedSen.url,
    contentType: ENDPOINTS.importUntaggedSen.contentType,
    dataType: ENDPOINTS.importUntaggedSen.dataType,
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

var reportSentence = function (data, callback, errCb){
  $.ajax({
    type: ENDPOINTS.reportSen.type,
    url: ENDPOINTS.reportSen.url,
    contentType: ENDPOINTS.reportSen.contentType,
    dataType: ENDPOINTS.reportSen.dataType,
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
}

var untagSentence = function (data, callback, errCb){
  $.ajax({
    type: ENDPOINTS.untagSen.type,
    url: ENDPOINTS.untagSen.url,
    contentType: ENDPOINTS.untagSen.contentType,
    dataType: ENDPOINTS.untagSen.dataType,
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
}


var getNERTasks = function (data, callback, errCb){
  $.ajax({
    type: ENDPOINTS.getNERTasks.type,
    url: ENDPOINTS.getNERTasks.url,
    contentType: ENDPOINTS.getNERTasks.contentType,
    dataType: ENDPOINTS.getNERTasks.dataType,
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
}

var getNERTasksStat = function (data, callback, errCb){
  $.ajax({
    type: ENDPOINTS.getNERTasksStat.type,
    url: ENDPOINTS.getNERTasksStat.url,
    contentType: ENDPOINTS.getNERTasksStat.contentType,
    dataType: ENDPOINTS.getNERTasksStat.dataType,
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
}

var countNERSentences = function (data, callback, errCb){
  $.ajax({
    type: ENDPOINTS.countNERSens.type,
    url: ENDPOINTS.countNERSens.url,
    contentType: ENDPOINTS.countNERSens.contentType,
    dataType: ENDPOINTS.countNERSens.dataType,
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
}

var pagingSentence = function (data, callback, errCb){
  $.ajax({
    type: ENDPOINTS.pagingSens.type,
    url: ENDPOINTS.pagingSens.url,
    contentType: ENDPOINTS.pagingSens.contentType,
    dataType: ENDPOINTS.pagingSens.dataType,
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
}

var nerAPI = {
  getRawSentence: getRawSentence,
  importTaggedSentence: importTaggedSentence,
  importUntaggedSentence: importUntaggedSentence,
  reportSentence: reportSentence,
  untagSentence: untagSentence,
  getNERTasks: getNERTasks,
  getNERTasksStat: getNERTasksStat,
  countNERSentences: countNERSentences,
  pagingSentence: pagingSentence
};

export{nerAPI}
