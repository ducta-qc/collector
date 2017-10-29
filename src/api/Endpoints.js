var ENDPOINTS = {
  fetchRawSen: {
    url: "/api/get_untagged_sen",
    type: "POST",
    contentType: "application/json",
    dataType: "json"
  },
  importTaggedSen: {
  	url: "/api/import_tagged_sen",
  	type: "POST",
  	contentType: "application/json",
  	dataType: "json"
  }
};

export{ENDPOINTS}