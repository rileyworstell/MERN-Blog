This is cloned: at desktop/API_Template

Section 2: Express & MongoDB Setup

Create Project and Create Cluster under that Project on mongodb.com
Add DB USER:
Username: riley123
Password: Baller97
Then go to network access and allow access. 0.0.0.0/0
Then connect to DB: connect your application (get connection string)
Connection String: mongodb+srv://riley123:<password>@rileydevconnector.wygel.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


Install Dependencies and Basic Express Setup.
    `npm init` to start package.json 
    then run
    `npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request`
    developer installations below.
    `npm i -D nodemon concurrently`

    added new scripts to start in package.json and initial server.


Connecting to MongoDB with Mongoose:
    config/db.js

middleware ---> Auth:
    middleware/auth.js



