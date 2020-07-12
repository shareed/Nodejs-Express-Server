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