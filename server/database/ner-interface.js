const async = require('async');
const models = require('./db');
const utils = require('../common/utils');
const crypto = require('crypto');
var NERInterface = {};

import { createErrorWithCode } from '../common/errors';
import { ERROR_CODES } from '../../src/types/errorCodes';

var NER = models.NER;
var flake = models.flake;

NERInterface.getUntaggedSen = function (data, callback){
  var task = data.task;
  NER.findAll({
      where:{tagged: 0, task: task, report: 0}, 
      limit:1})
    .then(function (results){
            if(results.length == 0){
              throw createErrorWithCode(ERROR_CODES.taggedSenNotFound)
            }
            var retSen = results[0];
            retSen = {
              id: retSen.id,
              sentence: retSen.sentence,
              task: retSen.task,
              tagged: retSen.tagged,
              hash: retSen.hash,
              intent: retSen.intent
            };
            callback(null, retSen);
            return null;
          })
    .catch(function (err){
      callback(err);
      return null;
    });
}


NERInterface.importUntaggedSen = function (data, callback){
  var untaggedSens = data.untaggedSens;
  var numImported = 0;
  var bulkHash = [];
  var bulk = [];

  for (var i=0; i < untaggedSens.length; i++){
    var untaggedSen = untaggedSens[i];
    var hash = crypto.createHash('md5').update(untaggedSen.sentence).digest("hex");
    bulkHash.push(hash);
    bulk.push({
      tagged: 0, report:0, sentence: untaggedSen.sentence,
      task: untaggedSen.task, intent: untaggedSen.intent,
      id: parseInt(flake.gen()),
      hash: hash,
      createdAt:utils.addHours(Date.now(), 7), 
      updateAt: utils.addHours(Date.now(), 7)
    })
  }

  async.waterfall([
    function(subCallback) {
      NER.findAll(
      {where:{hash:{in:bulkHash}}})
      .then(function (results){
        var existHashs = [];
        for (i=0; i < results.length; i++){
          existHashs.push(results[i].hash);
        }

        var filterBulk = [];
        for (i=0; i < bulk.length; i++){
          if(existHashs.indexOf(bulk[i].hash) === -1){
            filterBulk.push(bulk[i]);
          }else{
            console.log("Replicate:", bulk[i].sentence);
          }
        }
        subCallback(null, filterBulk);
        return null;
      })
      .catch(function (err){
        subCallback(err);
        return null;
      })
    },
    function(filterBulk, subCallback) {
      NER.bulkCreate(filterBulk, {updateOnDuplicate:['createAt', 'updateAt']})
        .then(function (){
          numImported += filterBulk.length;
          subCallback(null, {numImported: numImported});
          return null;
        })
        .catch(function (err){
          subCallback(err);
          return null;
        })
    }
  ], function (err, results) {
      return callback(err, results)
  });

  
}


NERInterface.importTaggedSen = function (data, callback){
  var taggedSens = data.taggedSens;

  async.each(taggedSens, 
    function (taggedSen, eachCallback){
      var report = 0;
      if (typeof taggedSen.report !== "undefined"){
        report = taggedSen.report;
      }
      NER.update(
        {tagged: 1, taggedSentence:taggedSen.sentence, 
         report: report, updateAt: utils.addHours(Date.now(), 7)},
        {where: {hash: taggedSen.hash}})
        .then(function (result) {
          // Update tagged field
            eachCallback()
            return null;
        })
        .catch(function (err){
          eachCallback(err, taggedSen);
          return null;
        })
    }, 
    function (err, results){
      if(err) {
        console.log('A tagged sentence failed to process', results, err);
        return callback(ERROR_CODES.internalServerError);
      } else {
        console.log('All tagged sentences have been processed successfully');
        return callback(null, {});
      }
    }
  )
}


NERInterface.getNERTasks = function (data, callback){
  NER.aggregate('task', 'DISTINCT', { plain: false})
    .then(function(results){
      if(results.length == 0){
        throw createErrorWithCode(ERROR_CODES.nerTasksNotFound);
      }
      var compactResults = [];
      for(var i=0; i < results.length; i++){
        compactResults.push(results[i].DISTINCT);
      }
      callback(null, compactResults);
    })
    .catch(function (err){
      callback(err, ERROR_CODES.internalServerError);
    })
}


NERInterface.reportSentence = function (data, callback){
  var id = data.id;
  NER.update(
    {report: 1, updateAt: utils.addHours(Date.now(), 7)},
    {where: {id: senId}})
    .then(function (result) {
      callback(null, {});
      return null;
    })
    .catch(function (err){
      callback(ERROR_CODES.internalServerError);
      return null;
    })
}

NERInterface.untagSentence = function (data, callback){
  var id = data.id;
  NER.update(
    {tagged: 0, updateAt: utils.addHours(Date.now(), 7)},
    {where: {id: senId}})
    .then(function (result) {
      callback(null, {});
      return null;
    })
    .catch(function (err){
      callback(ERROR_CODES.internalServerError);
      return null;
    })
}


NERInterface.getNERTaskStat = function (data, callback){
  var task = data.task;

  NER.aggregate('intent', 'DISTINCT', { plain: false, where:{ task: task }})
    .then(function (results){
        var compactIntents = ['*'];
        for(var i=0; i < results.length; i++){
          compactIntents.push(results[i].DISTINCT);
        }
        if(compactIntents.indexOf('') === -1){
          compactIntents.push('');
        }
        async.parallel({
          intentStat: function (intentStatCallback){
            var result = {};
            async.each(compactIntents, 
              function (intent, subCallback){
                var condition = {
                  report: 0,
                  intent: intent,
                  task: task,
                  tagged: 0
                };
                // fetch all intent
                if (intent === '*'){
                  delete condition.intent;
                }

                async.parallel({
                  untagged: function (untaggedCallback){
                    condition.tagged = 0;
                    NER.count({where:condition})
                      .then(function(c){
                        untaggedCallback(null, c);
                      })
                      .catch(function (err){
                        untaggedCallback(err);
                      });
                  },
                  tagged: function (taggedCallback){
                    condition.tagged = 1;
                    NER.count({where:condition})
                      .then(function(c){
                        taggedCallback(null, c);
                      })
                      .catch(function (err){
                        taggedCallback(err);
                      });
                  }
                },
                function (err, countResults){
                  if( err ) {
                    subCallback(err);
                  } else {
                    result[intent] = countResults;
                    subCallback();
                  }
                })
              },
              function (err, data){
                if( err ) {
                  intentStatCallback(err);
                } else {
                  intentStatCallback(null, result)
                }
              }
            );
          },
          reportStat: function (reportCallback){
            NER.count({where: {task:task, report: 1}})
              .then(function (c){
                reportCallback(null, c)
              })
              .catch(function (err){
                reportCallback(err);
              })
          }
        }, 
        function (err, results){
          if(err){
            return callback(ERROR_CODES.internalServerError);
          }else{
            return callback(null, results);
          }
        });
        return null;
    })
    .catch(function (err){
      callback(ERROR_CODES.internalServerError);
      return null;
    })
}

NERInterface.countNERSentences = function (data, callback){
  var task = data.task;
  NER.count({where: {task:task}})
    .then(function (c){
      callback(null, {senCount: c});
      return null;
    })
    .catch(function (err){
      callback(err);
      return null;
    })
}

NERInterface.setUntaggedSen = function (data, callback){
  NER.update(
    {tagged: 0, report: data.report, updateAt: utils.addHours(Date.now(), 7)},
    {where: {id: data.senId}})
    .then(function (result) {
      // Update tagged field
      callback(null, result);
      return null;
    })
    .catch(function (err){
      callback(ERROR_CODES.internalServerError);
      return null;
    })
}


NERInterface.pagingSen = function (data, callback){
  var offset = data.offset;
  var limit = data.limit;

  NER.findAll({
      limit: limit,
      offset: offset,
      order: [['createAt', 'DESC']],

  })
  .then(function (results){
    if(results.length == 0){
      throw createErrorWithCode(ERROR_CODES.taggedSenNotFound)
    }
    var compactResults = [];
    for (var i=0; i < results.length; i++){
      var retSen = results[i];
      compactResults.push({
        id: retSen.id,
        sentence: retSen.sentence,
        task: retSen.task,
        tagged: retSen.tagged,
        hash: retSen.hash,
        intent: retSen.intent
      })
    }
    callback(null, compactResults);
    return null;
  })
  .catch(function (err){
    callback(err);
    return null;
  })
}


module.exports = NERInterface;