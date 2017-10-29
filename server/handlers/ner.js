const async = require('async');
const models = require('../database/db');
import { createErrorWithCode } from '../common/errors';
import { ERROR_CODES } from '../../src/types/errorCodes';

var NERHandler = {};
var RawNER = models.RawNER;
var TaggedNER = models.TaggedNER;


NERHandler.getUntaggedSen = function (req, res, next){
  var task = req.body.task;
  
  RawNER.findAll({
          where:{tagged: 0, task:task, report:0}, 
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
      TaggedNER.create({
          id: taggedSen.hash, 
          sentence: taggedSen.sentence, 
          intent: taggedSen.intent, 
          report: report, 
          task:taggedSen.task})
        .then(function (result) {
          // Update tagged field
          RawNER.update(
            {tagged: 1},
            {where: {hash: taggedSen.hash}})
            .then(function (){
              callback();
            })
            .catch(function (err){
              callback(err, taggedSen)
            }
          )

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
        return res.status(404).send(ERROR_CODES.internalServerError);
      } else {
        console.log('All tagged sentences have been processed successfully');
        return res.status(200).send({});
      }
    }
  )
  
};


NERHandler.getNERTasks = function (req, res, next){
  RawNER.aggregate('task', 'DISTINCT', { plain: false })
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
          return res.status(404).send(err);
        })
};

module.exports = NERHandler;