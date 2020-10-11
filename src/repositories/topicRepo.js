'use strict'

const { TopicModel, BaseModel } = require('../models/')
const { DistinctArray, asyncHelpers } = require('../lib');
const { transaction } = require('../models/BaseModel')


module.exports = {
  async upsertMany(topics) {
    let transaction
    let result

    // ensure all duplicates are removed to reduce upsert conflicts
    const distinctTopics = new DistinctArray(topics, TopicModel.idColumn)

    try {
      // see if there are any matches for the incoming values in the db
      const existingIds = await this.readAllIds()    
      const transaction = await BaseModel.startTransaction()

      // clear away any records not in the upsert - we want the database to only have what we have here
      const deleteCount = await this.deleteManyByIdIfNotFound(distinctTopics, existingIds)
      // update any content for existing entries
      const updateCount = await this.updateManyIfFound(distinctTopics, existingIds)
      // do a fresh insert of any new values
      const insertCount = await this.insertManyIfNotFound(distinctTopics, existingIds)

      result = { deleteCount, updateCount, insertCount }

      transaction.commit()
    } catch (e) {
      console.log(e)
      transaction.rollback()
      throw new Error('Error in upsertMany', e)
    }
    console.log(`${JSON.stringify(result)} records upserted in ${TopicModel.tableName}`)
    return result
  },

  async readAll() {
    let results
    try {
      results = await TopicModel.query()
    } catch (e) {
      console.log(e)
      throw new Error('Error in readAll', e)
    }
    return results
  },

  async readAllIds() {
    let results
    try {
      results = await TopicModel.query()
          .select(TopicModel.idColumn)
          .then((results) => results.map((t) => t[TopicModel.idColumn]))   
    } catch (e) {
      console.log(e)
      throw new Error('Error in readAllIds', e)
    }
    return results
  },

  async readManyByIds(ids) {
    let results;
    try {
      results = await TopicModel.query()
        .findByIds(ids)
    } catch (e) {
      console.log(e)
      throw new Error('Error in readManyByIds', e)
    }
    return results
  },

  async insertMany(topics) {
    let count = 0
    if (!topics || topics.length === 0) {
      return await asyncHelpers.executeSyncAsAsync(() => count)
    } 
    try {
      const results = await TopicModel.query()
          .insert(topics)
      count = results.length
    } catch (e) {
      console.log(e)
      throw new Error('Error in insertMany', e)
    }
    console.log(`${count} records inserted in ${TopicModel.tableName}`)
    return count
  },

  async insertManyIfNotFound(incomingTopics, existingTopicIds = null) {
    let count = 0
    if (!incomingTopics || incomingTopics.length === 0) {
      return await asyncHelpers.executeSyncAsAsync(() => count)
    } 
    try {
      // get the ids of topics that already exist
      if (!existingTopicIds) {
        existingTopicIds = await this.readManyIdsByIds(incomingIds)
      }
      // filter out the incoming list to only those that aren't already in the database
      const insertTopics = incomingTopics.filter((t) => !existingTopicIds.includes(t[TopicModel.idColumn]))
      // only insert new entries
      count = await this.insertMany(insertTopics)
    } catch (e) {
      console.log(e)
      throw new Error('Error in insertMany', e)
    }
    console.log(`${count} records inserted in ${TopicModel.tableName}`)
    return count
  },

  async updateMany(topics) {
    let count = 0
    if (!topics || topics.length === 0) {
      return await asyncHelpers.executeSyncAsAsync(() => count)
    } 
    try {
      for (let i = 0; i < topics.length; i++) {
        const topic = topics[i]
        await TopicModel.query()
            .updateAndFetchById(topic[TopicModel.idColumn], topic)
        count++
      }
    } catch (e) {
      console.log(e)
      throw new Error('Error in updateMany', e)
    }
    console.log(`updateMany: ${count} records updated in ${TopicModel.tableName}`)
    return count
  },

  async updateManyIfFound(incomingTopics, existingTopicIds = null) {
    let count = 0
    if (!incomingTopics || incomingTopics.length === 0) {
      return await asyncHelpers.executeSyncAsAsync(() => count)
    } 
    try {
      // get the ids of topics that already exist
      if (!existingTopicIds) {
        existingTopicIds = await this.readManyIdsByIds(incomingIds)
      }
      // find which incoming topics are already in the database so we can update them
      const updateTopics = incomingTopics.filter((t) => existingTopicIds.includes(t[TopicModel.idColumn]))
      // update the items already in the database
      count = await this.updateMany(updateTopics)
    } catch (e) {
      console.log(e)
      throw new Error('Error in updateManyIfFound', e)
    }
    console.log(`updateManyIfFound: ${count} records updated in ${TopicModel.tableName}`)
    return count
  },

  async deleteManyByIds(ids) {
    let count = 0
    if (!ids || ids.length === 0) {
      return await asyncHelpers.executeSyncAsAsync(() => count)
    } 
    try {
      // delete all the items by id
      count = await TopicModel.query().delete().whereIn(TopicModel.idColumn, ids)
    } catch (e) {
      console.log(e)
      throw new Error('Error in deleteManyById', e)
    }
    console.log(`deleteManyByIds: ${count} records deleted in ${TopicModel.tableName}`)
    return count
  },

  async deleteManyByIdIfNotFound(incomingTopics, existingTopicIds = null) {
    let count = 0
    if (!incomingTopics || incomingTopics.length === 0) {
      return await asyncHelpers.executeSyncAsAsync(() => count)
    }
    try {
      // get the ids of the topics coming in
      const incomingIds = incomingTopics.map((t) => t[TopicModel.idColumn])
      // get the ids of topics that already exist
      if (!existingTopicIds) {
        existingTopicIds = await this.readManyIdsByIds(incomingIds)
      }
      // find which topics are in the database, but not in the incoming payload
      const deleteTopicIds = existingTopicIds.filter((t) => !incomingIds.includes(t)) 
      // delete the items that aren't incoming
      count = await this.deleteManyByIds(deleteTopicIds)
    } catch (e) {
      console.log(e)
      throw new Error('Error in deleteManyById', e)
    }
    console.log(`deleteManyIfNotFound: ${count} records deleted in ${TopicModel.tableName}`)
    return count
    
  }
}
