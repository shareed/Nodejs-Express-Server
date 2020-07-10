# Nodejs-Express-Server

## Server-Side Routing with Express
##### [Knex](http://knexjs.org/)
[Video](https://www.youtube.com/watch?time_continue=298&v=21Vpcup6LwM&feature=emb_logo)
* 
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
    * `npx knex migrate:make create-hubs-table`
    * **migrate** `npx knex migrate:latest`
* Migration files should not be changed after migration
* `npx knex migrate:rollback` will delete the last migration


**Knex seeds**
* Sample data we can prepopulate into a database (test data)
* Generate a seed file `npx seed:make 01-hubs`
* Run Seeds `npx knex seed:run`
* if you change the seed data it will reset the data
* Use sqlite3 studio to see database