const Hubs = require('./hubs-model.js');



function getHubs(req, res, next)  {
    Hubs.find(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
      next();
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
  };


  function addHub (req, res, next) {
    Hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    });
  }

function getHubById (req, res, next) {
        // res.send(200).json(req.hub);
        
        //DO NOT NEED THIS NOW THAT THERE IS A validatId middleware
        Hubs.findById(req.params.id)
        .then(hub => {
          if (hub) {
            res.status(200).json(hub);
            next();
          } else {
            res.status(404).json({ message: 'Hub not found' });
          }
        })
        .catch(error => {
          // log error to database
          console.log(error);
          res.status(500).json({
            message: 'Error retrieving the hub',
          });
        });
      };



function getHubMessagesByHubId(req, res, next) {
    Hubs.findHubMessages(req.params.id)
    .then(messages => {
      if (messages.length > 0) {
        res.status(200).json(messages);
        next();
      } else {
        res.status(404).json({ message: 'No messages for this hub' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the messages for this hub',
      });
    });
  };
  

function validateId(req, res, next) {
    const { id } = req.params;
    Hubs.findById(id) //search for id in hubs database
    .then(hub => { 
      if (hub) { // if the id is found
        req.hub = hub;//save it on the request object
        next();//go to next item 
      } else {
        res.status(404).json({message: 'hub is not found'});
      }
  
    })
    .catch(err => {
      res.status(500).json({message: 'failed', err});
    })
  }
  
  
  function requireBody(req, res, next) {
    const body = req.body;
    !body || body === {} ? //will evauate to true or false
    res.status(400).json({message: 'Please include body'})//true
    : next() //false
  }

  function deleteHub(req, res, next) {
    Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
        next();
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
  }


  function updateHub(req, res, next) {
    const changes = req.body;
    Hubs.update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
        next()
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    });
  }

  module.exports = { getHubs, addHub,  getHubById, validateId, requireBody, getHubMessagesByHubId,
                     deleteHub, updateHub }