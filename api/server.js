const express = require('express');
const helmet = require('helmet');
const shortid = require('shortid')

const hubsRouter = require('../hubs/hubs-router.js');
const messagesRouter = require('../messages/messages-router.js');
const authRouter = require("../auth/auth-router.js");
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const server = express();


const sessionConfig = {
    name: 'sessionId',
    secret: 'keep it secret, keep it safe!',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,   // https
      httpOnly: true,  // when true, js can't get to the cookie
    },
    // we should only save sessions when user allows it
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
      knex: require('../data/dbConfig.js'), // configured instance of knex
      tablename: 'sessions', // table that will store sessions inside the db, name it anything you want
      sidfieldname: 'sid', // column that will hold the session id, name it anything you want
      createtable: true, // if the table does not exist, it will create it automatically
      clearInterval: 1000 * 60 * 60, // time it takes to check for old sessions and remove them from the database to keep it clean and performant
    }),
  }
  
  server.use(session(sessionConfig))
server.use(express.json())
server.use("/auth", authRouter);
server.use('/api/hubs', hubsRouter); 
server.use('/api/hubs/messages', messagesRouter); 
server.use(helmet())








server.get('/', (req, res) => {
    res.json({hello: "HELLO THERE"})
})

// server.get('/hello', (req, res) => {
//     res.json({hello: "/hello endpoint"})
// })

// //CRUD
// let hubs = []
// //READ
// server.get('/api/hubs', (req, res) => {
//     res.json(hubs)
// })

// //CREATE
// server.post('/api/hubs', (req, res) => {
//     const hubInfo = req.body; //Gets the info from the user
//     hubInfo.id = shortid.generate(); //setting the hubs id with the shortid module using its generate function
//     hubs.push(hubInfo) //pushing the new hub info into the hubs array
//     res.status(201).json(hubInfo)
// })


// //UPDATE


// //DELETE
// server.delete('/api/hubs/:id', (req, res) => {
//     const { id } = req.params; //.paramas has whatever we put after the : in the url (pameter name)

//         // we need to find the id in the hubs array that matches the id
//     const deleted = hubs.find(hub => hub.id === id);
//     if (deleted) {// if found
//         hubs = hubs.filter(hub => hub.id !== id);
//         res.status(200).json({Deleted:deleted })
//     } else {
//         res.status(404).json({meassage: "Hub not found"});
//     }
// })


// //UPDATE- Change
// server.patch('/api/hubs/:id', (req, res) => {
//     const {id} = req.params;
//     const changes = req.body;

//     let found = hubs.find(hub => hub.id === id);

//     if (found) {
//         Object.assign(found, changes);
//         res.status(200).json(found);

//     } else {
//         res.status(404).json({message: "hub not found"})
//     }
// })



// // //UPDATE Rplace
// // server.put('/api/hubs/:id', (req, res) => {
// //     const {id} = req.params;
// //     const changes = req.body;
// //     changes.id = id;//ensures that the id does not change

// //     let index = hubs.findIndex(hub => hub.id === id); //find the index so we can change it in the array
// //     //findIndex will return -1 if the index is not found
// //     if (index !== -1) {// if found
// //         hubs[index] = changes
// //         res.status(200).json(hubs[index]);

// //     } else {
// //         res.status(404).json({message: "hub not found"})
// //     }
// // })


// server.put('/api/hubs/:id', (req, res) => {

//     const {id} = req.params;
//     const changes = req.body;
//     changes.id = id;//ensures that the id does not change

//     try {
//         let index = hubs.findIndex(hub => hub.id === id); //find the index so we can change it in the array
//     //findIndex will return -1 if the index is not found
//         if (index !== -1) {// if found
//             hubs[index] = changes
//             res.status(200).json(hubs[index]);

//         } else {
//             res.status(404).json({message: "hub not found"})
//         }
//     } catch (err) {
//         res.status(500).json({message: "error:", err})
//     }
//     });

module.exports = server;