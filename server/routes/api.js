const express = require('express');
const router = express.Router();
const NERHandler = require('../handlers/ner');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

router.post('/get_untagged_sen', function (req, res, next){
  NERHandler.getUntaggedSen(req, res, next);
})

router.post('/import_untagged_sen', function (req, res, next){
  NERHandler.importUntaggedSen(req, res, next);
})

router.post('/import_tagged_sen', function (req, res, next){
  NERHandler.importTaggedSen(req, res, next);
})

router.post('/get_ner_tasks', function (req, res, next){
  NERHandler.getNERTasks(req, res, next);
})

module.exports = router;

