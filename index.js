require('dotenv').config()
const server = require('./api/server.js');
const shortid = require('shortid')

let hubs = []
let assigners = []





server.get('/', (req, res) => {
    res.json({hello: "/ endpoint"})
})

server.get('/hello', (req, res) => {
    res.json({hello: "/hello endpoint"})
})

//CRUD
//READ
server.get('/api/hubs', (req, res) => {
    res.json(hubs)
})

//CREATE
server.post('/api/hubs', (req, res) => {
    const hubInfo = req.body; //Gets the info from the user
    hubInfo.id = shortid.generate(); //setting the hubs id with the shortid module using its generate function
    hubs.push(hubInfo) //pushing the new hub info into the hubs array
    res.status(201).json(hubInfo)
})


//UPDATE


//DELETE
server.delete('/api/hubs/:id', (req, res) => {
    const { id } = req.params; //.paramas has whatever we put after the : in the url (pameter name)

        // we need to find the id in the hubs array that matches the id
    const deleted = hubs.find(hub => hub.id === id);
    if (deleted) {// if found
        hubs = hubs.filter(hub => hub.id !== id);
        res.status(200).json({Deleted:deleted })
    } else {
        res.status(404).json({meassage: "Hub not found"});
    }
})


//UPDATE- Change
server.patch('/api/hubs/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    let found = hubs.find(hub => hub.id === id);

    if (found) {
        Object.assign(found, changes);
        res.status(200).json(found);

    } else {
        res.status(404).json({message: "hub not found"})
    }
})



// //UPDATE Rplace
// server.put('/api/hubs/:id', (req, res) => {
//     const {id} = req.params;
//     const changes = req.body;
//     changes.id = id;//ensures that the id does not change

//     let index = hubs.findIndex(hub => hub.id === id); //find the index so we can change it in the array
//     //findIndex will return -1 if the index is not found
//     if (index !== -1) {// if found
//         hubs[index] = changes
//         res.status(200).json(hubs[index]);

//     } else {
//         res.status(404).json({message: "hub not found"})
//     }
// })


server.put('/api/hubs/:id', (req, res) => {

    const {id} = req.params;
    const changes = req.body;
    changes.id = id;//ensures that the id does not change

    try {
        let index = hubs.findIndex(hub => hub.id === id); //find the index so we can change it in the array
    //findIndex will return -1 if the index is not found
        if (index !== -1) {// if found
            hubs[index] = changes
            res.status(200).json(hubs[index]);

        } else {
            res.status(404).json({message: "hub not found"})
        }
    } catch (err) {
        res.status(500).json({message: "error:", err})
    }
    });



const port =process.env.PORT; // the port is being read from the .env file


server.listen(port, () => console.log(`\n*** Server Running on http://localhost:${port} ***\n`))