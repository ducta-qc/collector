const NERInterface = require('../../database/ner-interface');
const utils = require('../../common/utils');
var NERHandler = {};

NERHandler.getUntaggedSen = function (req, res, next){
  var task = req.body.task;
  var intent = req.body.intent;
  NERInterface.getUntaggedSen(
    {task: task, intent:intent},
    function(err, results){
      if(err){
        return res.status(500).send(err);  
      }
      return res.json(results);
    }
  )
};


NERHandler.importUntaggedSen = function (req, res, next){
  var untaggedSens = req.body.untaggedSens;
  
  NERInterface.importUntaggedSen(
    {untaggedSens: untaggedSens},
    function (err, results){
      if(err){
        return res.status(500).send(err);  
      }
      return res.json(results);
    }
  )
};


NERHandler.importTaggedSen = function (req, res, next){
  var taggedSens = req.body.taggedSens;
  
  NERInterface.importTaggedSen(
    {taggedSens: taggedSens},
    function (err, results){
      if(err){
        return res.status(500).send(err);  
      }
      return res.json(results); 
    }
  )
};


NERHandler.getNERTasks = function (req, res, next){
  NERInterface.getNERTasks({},
    function (err, results){
      if(err){
        return res.status(500).send(err);  
      }
      return res.json(results);
    })
};


NERHandler.reportSentence = function (req, res, next){
  var senId = req.body.id;

  NERInterface.reportSentence(
    {id: senId},
    function (err, results){
      if(err){
        return res.status(500).send(err);  
      }
      return res.json(results);
    }
  )
};

NERHandler.untagSentence = function (req, res, next){
  var senId = req.body.id;

  NERInterface.untagSentence(
    {id: senId},
    function (err, results){
      if(err){
        return res.status(500).send(err);  
      }
      return res.json(results);
    }
  )
};


NERHandler.getNERTaskStat = function (req, res, next){
  var task = req.body.task;
  NERInterface.getNERTaskStat(
    {task: task},
    function (err, results){
      if(err){
        return res.status(500).send(err);  
      }
      return res.json(results); 
    }
  )
};


NERHandler.setUntaggedSen = function (req, res, next){
  var senId = req.body.id;
  var report = req.body.report;

  NERInterface.setUntaggedSen(
    {id: senId, report: report},
    function (err, results){
      if(err){
        return res.status(500).send(err);  
      }
      return res.json(results);  
    })
  
};


NERHandler.pagingSen = function (req, res, next){
  var offset = req.body.offset;
  var limit = req.body.limit;

  NERInterface.pagingSen(
    {offset: offset, limit: limit},
    function (err, results){
      if(err){
        console.log(err)
        return res.status(500).send(err);  
      }
      return res.json(results);  
    })
  
};


NERHandler.countNERSentences = function (req, res, next){
  var task = req.body.task;
  NERInterface.countNERSentences(
    {task: task},
    function (err, results){
      if(err){
        return res.status(500).send(err);  
      }
      return res.json(results); 
    }
  )
};


module.exports = NERHandler;