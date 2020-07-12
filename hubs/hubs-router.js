const express = require('express');

const Hubs = require('./hubs-model.js');
const { getHubs, addHub, getHubById, validateId, requireBody, getHubMessagesByHubId,
        deleteHub, updateHub} = require('./hubs-router-functions.js')
const router = express.Router();

//Custom Middleware
router.use((req, res, next) => {
  console.log('HUBS ROUTER');
  next();
})


router.get('/', getHubs);

router.get('/:id', validateId, getHubById);

router.get('/:id/messages', validateId, getHubMessagesByHubId);

router.post('/', requireBody, addHub);

router.delete('/:id', validateId, deleteHub);

router.put('/:id', validateId, requireBody, updateHub);

module.exports = router;