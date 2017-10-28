var HOST = window.location.hostname;

var ENDPOINTS = {
  fetchRawSen: {
    url:HOST + "/get_untagged_sen",
    type:"POST"
  }
};

export{ENDPOINTS}