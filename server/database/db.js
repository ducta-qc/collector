const Sequelize = require('sequelize');
var FlakeId = require('flakeid');

var db = new Sequelize(
    'collector', 'root', '123qwe',
    {
      host: 'localhost', dialect: 'mysql', 
      pool: {
        maxConnections : 200,
        minConnections : 1,
        maxIdleTime: 3600000
      },
      logging: true
    });

const Op = Sequelize.Op;

var NER = db.define('ner',{
  id: {type: Sequelize.BIGINT(11), primaryKey: true},
  sentence: {type: Sequelize.TEXT('medium'), allowNull: false},
  task: {type: Sequelize.STRING, allowNull: false},
  tagged: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0},
  hash: {type: Sequelize.CHAR(32), allowNull: false},
  intent: {type: Sequelize.STRING, allowNull: true},
  report: {type: Sequelize.BOOLEAN, defaultValue: 0},
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