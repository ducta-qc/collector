const Sequelize = require('sequelize');
var FlakeId = require('flakeid');

var db = new Sequelize(
    'collector', 'root', '123qwe',{host: 'localhost', dialect: 'mysql'});
const Op = Sequelize.Op;

var NER = db.define('ner',{
  id: {type: Sequelize.BIGINT, primaryKey: true},
  sentence: {type: Sequelize.TEXT('medium'), allowNull: false},
  task: {type: Sequelize.STRING, allowNull: false},
  tagged: {type: Sequelize.BOOLEAN, allowNull: false},
  hash: {type: Sequelize.CHAR(32), allowNull: false},
  intent: {type: Sequelize.STRING, allowNull: true},
  report: {type: Sequelize.BOOLEAN},
  taggedSentence: {type: Sequelize.TEXT('medium'), allowNull: true},
  createAt: {type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false},
  updateAt: {type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false}
},{
  freezeTableName: true,
  timestamps: false
});

var flake = new FlakeId({
    mid : 42, //optional, define machine id 
    timeOffset : (2017-1970)*31536000*1000 //optional, define a offset time 
});

var models = {
  NER: NER,
  flake: flake,
  Op: Op
};

module.exports = models;