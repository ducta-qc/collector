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
  },
  reportSen:{
    url: "/api/report_sen",
    type: "POST",
    contentType: "application/json",
    dataType: "json"
  },
  getNERTasks: {
    url: "/api/get_ner_tasks",
    type: "POST",
    contentType: "application/json",
    dataType: "json"
  },
  getNERTasksStat: {
    url: "/api/get_ner_tasks_stat",
    type: "POST",
    contentType: "application/json",
    dataType: "json"
  }
};

export{ENDPOINTS}