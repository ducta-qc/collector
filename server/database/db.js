const Sequelize = require('sequelize');

var db = new Sequelize(
    'collector', 'root', '123qwe',{host: 'localhost', dialect: 'mysql'});

var RawNER = db.define('raw_ner',{
  id: {type: Sequelize.BIGINT, primaryKey: true},
  sentence: {type: Sequelize.TEXT('medium'), allowNull: false},
  task: {type: Sequelize.STRING, allowNull: false},
  tagged: {type: Sequelize.BOOLEAN, allowNull: false},
  hash: {type: Sequelize.CHAR(32), allowNull: false},
  intent: {type: Sequelize.STRING, allowNull: true}
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
  }
},{
  freezeTableName: true,
  timestamps: false
});

var models = {
  RawNER: RawNER,
  TaggedNER: TaggedNER
}
module.exports = models;