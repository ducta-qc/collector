const Sequelize = require('sequelize');
var FlakeId = require('flakeid');

var db = new Sequelize(
    'collector', 'root', '123qwe',{host: 'localhost', dialect: 'mysql'});

var RawNER = db.define('raw_ner',{
  id: {type: Sequelize.BIGINT, primaryKey: true},
  sentence: {type: Sequelize.TEXT('medium'), allowNull: false},
  task: {type: Sequelize.STRING, allowNull: false},
  tagged: {type: Sequelize.BOOLEAN, allowNull: false},
  hash: {type: Sequelize.CHAR(32), allowNull: false},
  intent: {type: Sequelize.STRING, allowNull: true},
  report: {type: Sequelize.BOOLEAN}
},{
  freezeTableName: true,
  timestamps: false
});

var TaggedNER = db.define('tagged_ner',{
  id: {
    type: Sequelize.STRING, 
    primaryKey: true,
    references:{
      model: RawNER,
      key: 'hash'
    }
  },
  sentence: {type: Sequelize.TEXT('medium'), allowNull: false},
  intent: {type: Sequelize.STRING, allowNull: true},
  task: {type: Sequelize.STRING, allowNull: true},
  report: {type: Sequelize.BOOLEAN}
},{
  freezeTableName: true,
  timestamps: false
});

var flake = new FlakeId({
    mid : 42, //optional, define machine id 
    timeOffset : (2017-1970)*31536000*1000 //optional, define a offset time 
});

var models = {
  RawNER: RawNER,
  TaggedNER: TaggedNER,
  flake: flake
};

module.exports = models;