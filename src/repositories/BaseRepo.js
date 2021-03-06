'use strict'

const { DistinctArray, asyncHelpers } = require('../lib');
const { BaseModel } = require('../models/')

class BaseRepo {

  get model() {
    throw new Error('get model() must be overridden by ch')
  }

  async upsertMany(items) {
    let transaction
    let result

    // ensure all duplicates are removed to reduce upsert conflicts
    const distinctItems = new DistinctArray(items, this.model.idColumn)

    try {
      // see if there are any matches for the incoming values in the db
      const existingIds = await this.readAllIds()    
      transaction = await BaseModel.startTransaction()

      // clear away any records not in the upsert - we want the database to only have what we have here
      const deleteCount = await this.deleteManyByIdIfNotFound(distinctItems, existingIds)
      // update any content for existing entries
      const updateCount = await this.updateManyIfFound(distinctItems, existingIds)
      // do a fresh insert of any new values
      const insertCount = await this.insertManyIfNotFound(distinctItems, existingIds)

      result = { deleteCount, updateCount, insertCount }

      transaction.commit()
    } catch (e) {
      console.log(e)
      transaction.rollback()
      throw new Error('Error in upsertMany', e)
    }
    console.log(`${JSON.stringify(result)} records upserted in ${this.model.tableName}`)
    return result
  }

  async upsert(item) {
    console.log('Upserting: ' + JSON.stringify(item))
    let count = 0
    let action
    
    if (!item) return count

    try {
      const existingItem = await this.readById(item[this.model.idColumn])
      if (existingItem) {
        count = await this.update(item)
        action = 'updated'
      } else {
        count = await this.insert(item)
        action = 'inserted'
      }
    } catch (e) {
      console.log(e)
      throw new Error('Error in upsert', e)
    }
    console.log(`${count} records ${action} in ${this.model.tableName}`)
    return count
  }

  async readById(id) {
    let item
    try {
      item = await this.model.query().findById(id)
    } catch (e) {
      console.log(e)
      throw new Error('Error in readById', e)
    }
    return item
  }

  async readAll({orderBy = 'created_at' }) {
    let results
    try {
      results = await this.model.query().orderBy(orderBy)
    } catch (e) {
      console.log(e)
      throw new Error('Error in readAll', e)
    }
    return results
  }

  async readAllIds() {
    let results
    try {
      results = await this.model.query()
          .select(this.model.idColumn)
          .then((results) => results.map((t) => t[this.model.idColumn]))   
    } catch (e) {
      console.log(e)
      throw new Error('Error in readAllIds', e)
    }
    return results
  }

  async readManyByIds(ids) {
    let results;
    try {
      results = await this.model.query()
        .findByIds(ids)
    } catch (e) {
      console.log(e)
      throw new Error('Error in readManyByIds', e)
    }
    return results
  }

  async insert(item) {
    let count = 0
    try {
      await this.model.query().insert(item)
      count++
    } catch (e) {
      console.log(e)
      throw new Error('Error in insert', e)
    }
    console.log(`${count} records inserted in ${this.model.tableName}`)
    return count
  }

  async insertMany(items) {
    let count = 0
    if (!items || items.length === 0) {
      return await asyncHelpers.executeSyncAsAsync(() => count)
    } 
    try {
      const results = await this.model.query()
          .insert(items)
      count = results.length
    } catch (e) {
      console.log(e)
      throw new Error('Error in insertMany', e)
    }
    console.log(`${count} records inserted in ${this.model.tableName}`)
    return count
  }

  async insertManyIfNotFound(incomingItems, existingItemIds = null) {
    let count = 0
    if (!incomingItems || incomingItems.length === 0) {
      return await asyncHelpers.executeSyncAsAsync(() => count)
    } 
    try {
      // get the ids of items that already exist
      if (!existingItemIds) {
        existingItemIds = await this.readAllIds()
      }
      // filter out the incoming list to only those that aren't already in the database
      const insertItems = incomingItems.filter((t) => !existingItemIds.includes(t[this.model.idColumn]))
      // only insert new entries
      count = await this.insertMany(insertItems)
    } catch (e) {
      console.log(e)
      throw new Error('Error in insertMany', e)
    }
    console.log(`${count} records inserted in ${this.model.tableName}`)
    return count
  }

  async update(item) {
    let count = 0
    try {
      await this.model.query().findById(item[this.model.idColumn]).patch(item)
      count++
    } catch (e) {
      console.log(e)
      throw new Error('Error in update', e)
    }
    console.log(`update: ${count} records updated in ${this.model.tableName}`)
    return count
  }

  async updateMany(items) {
    let count = 0
    if (!items || items.length === 0) {
      return await asyncHelpers.executeSyncAsAsync(() => count)
    } 
    try {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        await this.model.query()
            .patchAndFetchById(item[this.model.idColumn], item)
        count++
      }
    } catch (e) {
      console.log(e)
      throw new Error('Error in updateMany', e)
    }
    console.log(`updateMany: ${count} records updated in ${this.model.tableName}`)
    return count
  }

  async updateId(oldId, newId) {
    let count = 0
    try {
      const updateQuery = {}
      updateQuery[this.model.idColumn] = newId
      await this.model.knexQuery().update(updateQuery).where(this.model.idColumn, oldId)
    } catch (e) {
      console.log(e)
      console.log('OLD ID: ' + oldId)
      console.log('New ID: ' + newId)
      // throw new Error('Error in updateId', e)
    }
    return count
  }

  async updateManyIfFound(incomingItems, existingItemIds = null) {
    let count = 0
    if (!incomingItems || incomingItems.length === 0) {
      return await asyncHelpers.executeSyncAsAsync(() => count)
    } 
    try {
      // get the ids of items that already exist
      if (!existingItemIds) {
        existingItemIds = await this.readAllIds()
      }
      // find which incoming items are already in the database so we can update them
      const updateItems = incomingItems.filter((t) => existingItemIds.includes(t[this.model.idColumn]))
      // update the items already in the database
      count = await this.updateMany(updateItems)
    } catch (e) {
      console.log(e)
      throw new Error('Error in updateManyIfFound', e)
    }
    console.log(`updateManyIfFound: ${count} records updated in ${this.model.tableName}`)
    return count
  }

  async deleteManyByIds(ids) {
    let count = 0
    if (!ids || ids.length === 0) {
      return await asyncHelpers.executeSyncAsAsync(() => count)
    } 
    try {
      // delete all the items by id
      count = await this.model.query().delete().whereIn(this.model.idColumn, ids)
    } catch (e) {
      console.log(e)
      throw new Error('Error in deleteManyById', e)
    }
    console.log(`deleteManyByIds: ${count} records deleted in ${this.model.tableName}`)
    return count
  }

  async deleteManyByIdIfNotFound(incomingItems, existingItemIds = null) {
    let count = 0
    if (!incomingItems || incomingItems.length === 0) {
      return await asyncHelpers.executeSyncAsAsync(() => count)
    }
    try {
      // get the ids of the item coming in
      const incomingIds = incomingItems.map((t) => t[this.model.idColumn])
      // get the ids of items that already exist
      if (!existingItemIds) {
        existingItemIds = await this.readAllIds()
      }
      // find which items are in the database, but not in the incoming payload
      const deleteItemIds = existingItemIds.filter((t) => !incomingIds.includes(t)) 
      // delete the items that aren't incoming
      count = await this.deleteManyByIds(deleteItemIds)
    } catch (e) {
      console.log(e)
      throw new Error('Error in deleteManyById', e)
    }
    console.log(`deleteManyIfNotFound: ${count} records deleted in ${this.model.tableName}`)
    return count
    
  }
}

module.exports = BaseRepo
