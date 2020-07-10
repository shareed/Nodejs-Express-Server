# Nodejs-Express-Server

## Server-Side Routing with Express
##### [Knex](http://knexjs.org/)
[Video](https://www.youtube.com/watch?time_continue=298&v=21Vpcup6LwM&feature=emb_logo)

* **Install knex and Sqlite3** `npm add knex sqlite3`
* to use the CLI install it globally also,`npm install -g knex`, you may or can use `npx knex` instead of `knex`, instead of installing it globally, to see commands
* **Create knifile.js** `npx knex init`
    * In the knexfile.js there is a development congfig object, add the following code to it

            useNullAsDefault: true,
            migrations: {
            directory: './data/migrations'
            },
            seeds: {
            directory: './data/seeds'
            } 
**Make a migration**
*  `npx knex migrate:make create-hubs-table`
* **Migrate Latest:** `npx knex migrate:latest`
* Migration files should not be changed after migration
* `npx knex migrate:rollback` will delete the last migration


**Knex seeds**
* Sample data we can prepopulate into a database (test data)
* Generate a seed file `npx knex seed:make 01-hubs`
* Run Seeds `npx knex seed:run`
* if you change the seed data it will reset the data
* Use sqlite3 studio to see database



**Express Router**
[REPO](https://github.com/LambdaSchool/node-api2-guided-solution)
* Create a file to create a router in
* Require express
* Create a router using express Router `const router = express.Router();`

Use this table to contrast RESTful endpoints from non RESTful counterparts.

| Not using REST      | Using REST                                  |
| ------------------- | ------------------------------------------- |
| `/listAllHubs`      | GET /hubs                                   |
| `/createHub`        | POST /hubs                                  |
| `/updateHub`        | PUT /hubs/:id                               |
| `/deleteHub`        | DELETE /hubs/:id                            |
| `/listHubMessages`  | GET /hubs/:id/messages                      |
| `/countHubMessages` | GET /hubs/:id/messages as an extra property |


## Exporting Modules the CommonJS Way

- make sure to download all dependencies with `npm i`.
- use `npm run server` to run the API and visit `/api/hubs` to make sure it's working.
- add a new `server.js` file.
- move the server creation and configuration, including middleware and routes to that file.
- make sure to export the server at the bottom: `module.exports = server`. Explain that this is the `CommonJS` way of exporting modules.

```js
// server.js
const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

// other endpoints go here, omitted for brevity

module.exports = server;
// this is equivalent to: export default server; for ES2015 modules
```

- require `server.js` into `index.js`.

```js
// all the content left inside index.js
const server = require('./server.js'); // add this

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
```

- test that the the API still works.


Nex, we'll break the application into sub-application using Express Routers.

## Add Hubs Router

- inside the `hubs` folder at a new file, call it `hubs-router.js`.
- add this content to `hubs-router.js`. Note how similar it is to creating a full server.

```js
const express = require('express');

const router = express.Router();
// Take time to explain that a Router can have routes and middleware just like a full server can.

module.exports = router;
```

- move all endpoints for `/api/hubs` from `server.js` to the newly created router.
- move the `require` for the `hubs-model` from server to the router.
- refactor all instances of `server.` to read `router.` as those endpoints now belong to the router and not the server.
- remove `/api/hubs` from the URL of all the endpoints. This router only cares about what comes after `/api/hubs`.

After all the changes, `hubs-router.js` file looks like this:

```js
const express = require('express');

const Hubs = require('./hubs-model.js'); // dont' forget to update the path to file

const router = express.Router();

// handles GET /api/hubs/
router.get('/', async (req, res) => {
  // same implementation as before omitted to save space
});

// handles GET /api/hubs/:id
router.get('/:id', async (req, res) => {
  // same implementation as before omitted to save space
});

// handles POST /api/hubs/
router.post('/', async (req, res) => {
  // same implementation as before omitted to save space
});

router.delete('/:id', async (req, res) => {
  // same implementation as before omitted to save space
});

router.put('/:id', async (req, res) => {
  // same implementation as before omitted to save space
});

module.exports = router;
```

- the last step is to go back to `server.js` and `use` the router for all routes that begin with `/api/hubs`.

```js
const hubsRouter = require('./hubs/hubs-router.js'); // add this line after requiring express

server.use(express.json());
server.use('/api/hubs', hubsRouter); // add this line to use the router
```

## Reading Query String Parameters

1. Create a file markdown file (notes.md is what I use) for the next step.
1. Do a quick search in google for `query string parameters`.
1. Copy the URL from the browser and paste it in your markdown file. It looked like this for me:

```md
https://www.google.com/search?newwindow=1&source=hp&ei=Z1drXP_JBYS0ggepyrmIAQ&q=query+string+parameters&btnK=Google+Search&oq=query+string+parameters&gs_l=psy-ab.3..0l10.1617.6689..6917...2.0..0.122.2798.2j25......0....1..gws-wiz.....0..0i131j0i10._0l3Msv44yw
```

4. Use the URL to introduce the concept of `query string parameters`.
5. break it up showing how query string parameters work:

```txt
https://www.google.com/search
?           <--marks the beginning of the query string
newwindow=1 <-- a key value/pair
&           <-- separator for the next key/value pair
source=hp   <-- rinse and repeat
&
ei=Z1drXP_JBYS0ggepyrmIAQ
delete the rest
```

`Express` will take the query string, parse it and save it as an object in the request under `req.query`. In that example the resulting `req.query` would look like this:

```js
req.query = {
  newwindow: '1',
  source: 'hp',
  ei: 'Z1drXP_JBYS0ggepyrmIAQ',
};
```

Let's see this in action. Notice this endpoint:

```js
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
```

Now let's look at the `.find()` method of `hubs-model.js`. It is set to read `page`, `limit`, `sortby` and `sortdir` from the query string and use it to do pagination and sorting of the records at the database level.

```js
function find(query) {
  const { page = 1, limit = 2, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('hubs')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}
```

#### How to send parameters through the query string.

- Use `Postman` to make a request to `/api/hubs`, notice we only see 2 records.
- change the url to include the `limit` query string parameter: `/api/hubs?limit=5`. This makes the page size be 5 records.
- change the url to include the `page` query string parameter: `/api/hubs?limit=5&page=2`. Now the next 5 records are shown.
- change the url to include the `sortby` and `sortdir` query string parameters: `/api/hubs?limit=5&page=2&sortby=name&sortdir=desc`.


Next, let's see how to handles sub-resources by building an endpoint to view all `messages` for a `hub`.

## Use sub-routes

When a resource only makes sense within the context of another resource, in REST we create a sub-route. For our use case, the `message` resource lives within the `hub` resource.

Here's the code:

```js
router.get('/:id/messages', (req, res) => {
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
```


#### Write and endpoint to new message to a hub.

A possible solution using sub-routes:

```js
router.post('/:id/messages', (req, res) => {
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
```

#### Sometimes the following error displays in the console 
`Cannot set header after they are sent to the client`.

This code suffers from that:

```js
router.get('/:id', (req, res) => {
  Hubs.findById(req.params.id)
  .then(hub => {
    if (hub) {
      res.status(200).json(hub); // forget to add return at the beginning of this line
    }
    // this code tries to modify the response a second time, this is the reason for the error
    res.status(404).json({ message: 'Hub not found' });
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  });
});
```

- fix it by wrapping the `404` in an `else` or changing the success line to `return res.status(200).json(hub);`

```js
if (hub) {
  res.status(200).json(hub);
} else {
  res.status(404).json({ message: 'Hub not found' });
}
```
