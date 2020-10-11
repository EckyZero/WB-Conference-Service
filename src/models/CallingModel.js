const BaseModel = require('./BaseModel')

class CallingModel extends BaseModel {
  static get tableName() { return 'callings' }
  static get idColumn() { return 'calling_uid' }
}

module.exports = CallingModel;