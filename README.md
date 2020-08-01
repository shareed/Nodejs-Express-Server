# Nodejs-Express-Server

## ADDING ROUTES CRUD
Express Routing 
[Video](https://www.youtube.com/watch?v=McUdQ9kR2uE&feature=youtu.be)
[Documentation](https://expressjs.com/en/4x/api.html)
* `const server = express();` this creates a server object from express
* the server oject has methods for Routing HTTP requests(server.get(), server.post(), etc)


#### GET
#### POST

* shortid creates short non-sequential url-friendly unique ids
    * `npm install shortid`
    *  require shortid wherever you are creating your post endpoint `const shortid = require('shortid')`
    *  Create id for each hub when a post request is made using shortid
    
            server.post('/api/hubs', (req, res) => {
            const hubInfo = req.body; //Gets the info from the user
            hubInfo.id = shortid.generate(); //setting the hubs id with the shortid module using its generate function
            hubs.push(hubInfo) //pushing the new hub info into the hubs array
            res.status(201).json(hubinfo)
            })
    * If you try to make a post request now you will still get an error, because the body needs to be parsed
        * `server.use(express.json())`
        * `.use()` with no path allows us to give the server a fuction that will run no matter what the method is
        * `express.json()` a function that rey=turns another function that express will use to process every request first

#### PUT
#### DELETE