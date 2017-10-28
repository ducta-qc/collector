const express = require('express');
const router = express.Router();
const models = require('../database/db');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

router.post('/get_untagged_sen', function(req, res, next){
  task = req.body.task;
  RawNER = models.RawNER;
  RawNER.findAll({
          where:{tagged: 0, task:task}, 
          limit:1})
        .then(function(results){
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
        .catch(function(err){
          return res.status(404).end();
        });
})

router.post('/import_untagged_sen', function(req, res, next){

})

router.post('/import_tagged_sen', function(req, res, next){
  
})

module.exports = router

