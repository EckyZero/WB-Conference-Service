const express = require('express');
const router = express.Router();
const { RedisBootstrapper } = require('../bootstrapper');
const { syncService } = require('../services')


router.post('/sync', (req, res, next) => {
  syncController.sync(req, res, next);
});



/* GET users listing. */
router.get('/:userId', async function(req, res, next) {
  const { userId } = req.params;
  
  try {
    // TODO: add topic controller, sync service that use the web objects
    // TODO: organize redis vs. db calls
    // const firstName = await redis.get(userId);
    // TODO: read https://dzone.com/articles/how-to-develop-your-nodejs-docker-applications-fas
    // TODO: find a way to persist / keep the pgadmin db reference between deployes so I can keep my queries up
    const calling = await CallingModel.query().where('title', 'Sister').limit(1).first()
    const topics = await TopicModel.query().where('tag','jesus-christ').withGraphFetched('talks')
    const talks = await TalkModel.query().where('title','Come unto Christ—Living as Latter-day Saints').withGraphFetched('topics');
    const speakers = await SpeakerModel.query().joinRelated('calling').where('calling.title', 'Elder').withGraphFetched('calling').withGraphFetched('person')
    const sessions = await SessionModel.query().joinRelated('conference').where('conference.year', '2020').withGraphFetched('conference')

    return res.status(200).send(calling);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.post('/', async function(req, res, next) {
  const { userId, firstName } = req.body;

  try {
    await RedisBootstrapper.instance() .set(userId, firstName)
    return res.status(201).send();
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
