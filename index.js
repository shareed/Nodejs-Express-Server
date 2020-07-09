require('dotenv').config()
const server = require('./api/server.js');




server.get('/', (req, res) => {
    res.send('HELLO, YOU HAVE ENTERED MY SERVER')
})

// server.listen(4000, () => console.log(`\n*** Server Running on http://localhost:4000 ***\n`))

//Making a port variable
// const port = 4000;


//Lets read the enviorment from nodejs
//nodejs gives up a process object( where the nodejs applications is running)
//process object has a property call env(a JS object), represents the environment, we can read from and add to the env
//We are using this object to read the port dynamically from the enviorment, 
//so we can change the port without having to change the source code
const port =process.env.PORT; // the port is being read from the .env file


server.listen(port, () => console.log(`\n*** Server Running on http://localhost:${port} ***\n`))