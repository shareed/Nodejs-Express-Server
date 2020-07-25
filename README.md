# Nodejs-Express-Server

## Middleware
####BuiltIn
* is included with Express, but not added to the application automatically
####Custom
*  functions we write to perform certain tasks
####Third Party
* npm modules that we can install and then import into our applications using require()
* Helmet - helps you secure your Express apps by setting various HTTP headers
* Morgan - 




- npm install connect-session-knex
- npm install express-session
- npm instal bcryptjs
- npm i cors
- https://github.com/LambdaSchool/node-auth1-guided/tree/lecture
- https://www.youtube.com/watch?v=_Ust7c29YVc&feature=youtu.be


# Hashing passwords usig Bcryptjs
* password hashing function.
* implements salting both manually and automatically.
* accumulative hashing rounds.
* npm i bcryptjs
**Register Endpoint**

            router.post("/register", (req, res) => {
                // 1- pull credentials from body
                let user = req.body;

                // 2- make a hash using bcrypt
                //        - import the lib
                //        - use the lib
                //        - hashSync takes raw password and the number of rounds
                const hash = bcrypt.hashSync(user.password, 10) // 2 ^ 10
                // 3- we will save { username, password (hashed) } into db
                Users.add({
                    hubname,
                    email,
                    password: hash,
                })
                    .then(data => {
                    console.log(data)
                    res.status(200).json(data)
                    })
                    .catch(err => {
                    console.log(err)
                    res.status(500).json({ message: `Something went really poorly` })
                    })
                // 4- we can json back to the client whatever, res.end, res.send, res.json
                })




**Login Endpoint**

        server.post('/api/login', (req, res) => {
        let { username, password } = req.body;

        Users.findBy({ username })
            .first()
            .then(user => {
            // check that passwords match
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                // we will return 401 if the password or username are invalid
                // we don't want to let attackers know when they have a good username
                res.status(401).json({ message: 'Invalid Credentials' });
            }
            })
            .catch(error => {
            res.status(500).json(error);
            });
        }); 


### Adding Sessions
* Sessions provide a way to persist data across requests.
* each client will have a unique session stored on the server.
* Cookies will be used to transmit information between the client and server

**The basic workflow when using a combination of cookies and sessions for authentication is:**

* Client sends credentials.
* Server verify credentials.
* Server creates a session for the client.
* Server produces and sends back cookie.
* Client stores the cookie.
* Client sends cookie on every request.
* Server verifies that cookie is valid.
* Server provides access to resource.

* Every HTTP message, be it a request or a response, has two main parts: the headers and the body.
* **headers** are a set of key/value stores that include information about the request,  There are several standard headers, but we can add our own if needed.

### Cookies
* Cookies are not accessible from JavaScript or anywhere because they are cryptographically signed and very secure.
* To send cookies, the server adds the Set-Cookie header to the response: `"Set-Cookie": "session=12345"`
* The browser will read the header and save a cookie called session with the value 12345 in this example
* We will use a library that takes care of creating and sending the cookie.
* The body contains the data portion of the message
* The browser will add the "Cookie": "session=12345" header on every subsequent request and the server


* Automatically included on every request.
* Unique to each domain + device pair.
* Cannot be sent to a different domain.
* Sent in the cookie header.
* Has a body that can have extra identifying information.
* Max size around 4KB.
* Storing session data in memory
* Data stored in memory is wiped when the server restarts.
* Causes memory leaks as more and more memory is used as the application continues to store data in session for different clients.
* Good for development due to its simplicity.
* Using cookies to transfer session data.
#### Advantages when using cookies:

* a cookie is a small key/value pair data structure that is passed back and forth between client and server and stored in the browser.
* the server uses it to store information about a particular client/user.
* workflow for using cookies as session storage:
    * the server issues a cookie with an expiration time and sends it with the response.
    * browsers automatically store the cookie and send it on every request to the same domain.
    * the server can read the information contained in the cookie (like the username).
    * the server can make changes to the cookie before sending it back on the response.
    * rinse and repeat.
**Express-session uses cookies for session management.**

**Drawbacks when using cookies:**

* small size, around 4KB.
* sent in every request, increasing the size of the request if too much information is stored in them.
* if an attacker gets a hold of the private key used to encrypt the cookie, they could read the cookie data.
* Storing session data in Memory Cache (preferred way of storing sessions in production applications)
* stored as key-value pair data in a separate server.
* the server still uses a cookie, but it only contains the session id.
* the memory cache server uses that session id to find the session data.
**Advantages:**

* Quick lookups.
* Decoupled from the API server.
* A single memory cache server can serve many applications.
* Automatically remove old session data.
**Drawbacks:**

* another server to set up and manage.
* extra complexity for small applications.
* hard to reset the cache without losing all session data.
* Storing session data in a database
* Similar to storing data in a memory store.
* The session cookie still holds the session id.
* The server uses the session id to find the session data in the database.
* Retrieving data from a database is slower than reading from a memory cache.
* Causes chatter between the server and the database.
* Need to manage/remove old sessions manually or the database will be filled with unused session data. Most libraries now manage this for you.