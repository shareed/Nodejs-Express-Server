# Nodejs-Express-Server


| Install | What it does |
| :---         |     :---:      |
| `npm init -y`   | *Creates package.json file*
| `npm install express`   | *Framework for node applications*
| `npm install --save-dev nodemon`     | *Automatically restarts the node application when file changes in the directory are detected* 
| `npm install dotenv`     | *Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.*   
| `npm install helmet --save`    | *Helps you secure your Express apps by setting various HTTP headers*   


**In the server.js file**  
* Require express and helmet 
    * `const express = require('express');`
    * `const helmet = require('helmet');`
* Create the express server and export it
    * `const server = express();`
    * `module.exports = server;`
* Use helmet
    * `server.use(helmet())`

**In the index.js file**  
* Require dotenv and call the configure method on it `require('dotenv').config()`
* Require the server.js file and set it to a variable
    * `const server = require('./api/server.js');`
* Create a get route
* Configure the port to be dynamically read from .env file `const port =process.env.PORT;`
    * Pass the port variale to where your server is listening
    
            server.listen(port, () => console.log(`\n*** Server Running on http://localhost:${port} ***\n`))
* Create a .env file in the root of project
    * Add `PORT=8000`
    * *Be sure to add .env to the gitignore file*



**Add scripts to package.json file**

        "scripts": {
            "start": "node index.js",
            "server": "nodemon index.js"
        }
**Run `npm start` to start server**





### Deploying to Heroku
* Create an app on [Heroku](https://www.heroku.com/)
* Heroku looks for the start script in your package.json file in order to run the server, if you do not have it you will get a Application Error
**Setting up environment variables on Heroku**
* the .env file gets ignored when pushed to heroku, so heroku knows nothing about our environment variables, we must add them on heroku for them to work
* Settings ---> Reveal Config Vars ---> Add your envirorment variables









###### References
* [NPM](https://www.npmjs.com/)