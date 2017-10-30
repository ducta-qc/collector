const async = require('async');
const models = require('../database/db');
const utils = require('../common/utils');
import { createErrorWithCode } from '../common/errors';
import { ERROR_CODES } from '../../src/types/errorCodes';

var NERHandler = {};
var NER = models.NER;


NERHandler.getUntaggedSen = function (req, res, next){
  var task = req.body.task;

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
            res.json(retSen);
          })
    .catch(function (err){
      console.log(err)
      return res.status(404).send(err);
    });
};


NERHandler.importUntaggedSen = function (req, res, next){
  next();
};


NERHandler.importTaggedSen = function (req, res, next){
  var taggedSens = req.body.taggedSens;
  
  async.each(taggedSens, 
    function (taggedSen, callback){
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
            callback()
        })
        .catch(function (err){
          callback(err, taggedSen);
        })
    }, 
    function (err, data){
      if( err ) {
        // One of the iterations produced an error.
        // All processing will now stop.
        console.log('A tagged sentence failed to process', data, err);
        return res.status(500).send(ERROR_CODES.internalServerError);
      } else {
        console.log('All tagged sentences have been processed successfully');
        return res.status(200).send({});
      }
    }
  )
  
};


NERHandler.getNERTasks = function (req, res, next){
  NER.aggregate('task', 'DISTINCT', { plain: false})
    .then(function(results){
      if(results.length == 0){
        throw createErrorWithCode(ERROR_CODES.nerTasksNotFound);
      }
      var compactResults = [];
      for(var i=0; i < results.length; i++){
        compactResults.push(results[i].DISTINCT);
      }
      res.json(compactResults);
    })
    .catch(function (err){
      return res.status(500).send(ERROR_CODES.internalServerError);
    })
};


NERHandler.reportSentence = function (req, res, next){
  var senId = req.body.id;

  NER.update(
    {report: 1, updateAt: utils.addHours(Date.now(), 7)},
    {where: {id: senId}})
    .then(function (result) {
      // Update tagged field
      return res.status(200).send({});
    })
    .catch(function (err){
      return res.status(500).send(ERROR_CODES.internalServerError);
    })
};


NERHandler.getNERTaskStat = function (req, res, next){
  var task = req.body.task;
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
          intentStat: function (callback){
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
                  callback(err);
                } else {
                  callback(null, result)
                }
              }
            );
          },
          reportStat: function (callback){
            NER.count({where: {report: 1}})
              .then(function (c){
                callback(null, c)
              })
              .catch(function (err){
                callback(err);
              })
          }
        }, 
        function (err, results){
          if(err){
            return res.status(500).send(ERROR_CODES.internalServerError);
          }else{
            res.json(results);
          }
        });
    })
    .catch(function (err){
      return res.status(500).send(ERROR_CODES.internalServerError);
    })
};

module.exports = NERHandler;