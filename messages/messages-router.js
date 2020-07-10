  
const express = require('express');

const Hubs = require('./messages-model.js');

const router = express.Router();


// You Do: post new message to a hub
router.post('/:id/message', (req, res) => {
    const messageInfo = { ...req.body, hub_id: req.params.id };
    Hubs.addMessage(messageInfo)
    .then(message => {
      res.status(201).json(message);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the message',
      });
    });
  });
  
  module.exports = router;