const express = require('express');

const Hubs = require('./hubs-model.js');

const router = express.Router();

//Custom Middleware
router.use((req, res, next) => {
  console.log('HUBS ROUTER');
  next();
})


router.get('/', (req, res) => {
  Hubs.find(req.query)
  .then(hubs => {
    res.status(200).json(hubs);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  });
});

router.get('/:id', validateId, (req, res) => {
  res.send(200).json(req.hub);
  
  //DO NOT NEED THIS NOW THAT THERE IS A validatId middleware
  // Hubs.findById(req.params.id)
  // .then(hub => {
  //   if (hub) {
  //     res.status(200).json(hub);
  //   } else {
  //     res.status(404).json({ message: 'Hub not found' });
  //   }
  // })
  // .catch(error => {
  //   // log error to database
  //   console.log(error);
  //   res.status(500).json({
  //     message: 'Error retrieving the hub',
  //   });
  // });
});

router.get('/:id/messages', validateId, (req, res) => {
  Hubs.findHubMessages(req.params.id)
  .then(messages => {
    if (messages.length > 0) {
      res.status(200).json(messages);
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
});

router.post('/', async (req, res, next) => {
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
});

router.delete('/:id', validateId, (req, res) => {
  Hubs.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The hub has been nuked' });
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
});

router.put('/:id', validateId, (req, res) => {
  const changes = req.body;
  Hubs.update(req.params.id, changes)
  .then(hub => {
    if (hub) {
      res.status(200).json(hub);
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
});


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


module.exports = router;