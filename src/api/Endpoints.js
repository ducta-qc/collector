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
  importUntaggedSen: {
    url: "/api/import_untagged_sen",
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
  untagSen:{
    url: "/api/untag_sen",
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
  },
  countNERSens: {
    url: "/api/count_ner_sentences",
    type: "POST",
    contentType: "application/json",
    dataType: "json"
  },
  pagingSens: {
    url: "/api/paging",
    type: "POST",
    contentType: "application/json",
    dataType: "json"
  }
};

export{ENDPOINTS}