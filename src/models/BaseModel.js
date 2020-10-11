const { Model } = require('objection')
const _ = require('lodash')

class BaseModel extends Model {
  $formatJson(jsonRaw) {
    let json = super.$formatJson(jsonRaw)
    json = _.omit(json, ['updated_at', 'created_at'])
    return json
  }
}

module.exports = BaseModel;
