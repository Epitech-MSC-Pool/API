# Awesome API Project For Gotham City

Steps to run this project:

## Let’s start

TypeORM has a CLI tool that allow us to generate a base application already in TypeScript. To use this tool we need first to install typeORM as a global dependency:

    npm install -g typeorm

Now we can set up our application:

    typeorm init --name jwt-express-typeorm --database sqlite --express

It will create an example express application already in TypeScript with TypeORM and body-parser. Let’s install those dependencies with:

    npm install

Now, we are going to install some additional dependencies

    npm install -s helmet cors jsonwebtoken bcryptjs class-validator ts-node-dev

After that, we are going to have the following dependencies

**helmet**
Help us to secure our application by setting various HTTP headers

**cors**
Enable cross-origin Requests

**body-parser**
Parses the client’s request from json into javascript objects

**jsonwebtoken**
Will handle the jwt operations for us

**bcryptjs**
Help us to hash user passwords

**typeorm**
The ORM we are going to use to manipulate database

**reflect-metadata**
allow some annotations features used with TypeORM

**class-validator** 
A validation package that works really well with TypeORM

**sqlite3** 
We are going to use sqlite as dev database

**ts-node-dev**
Automatically restarts the server when we change any file

### Installing type check dependencies 

Since we are working with TypeScript, it is a good idea to install @types for our dependencies.

    npm install -s @types/bcryptjs @types/body-parser @types/cors @types/helmet @types/jsonwebtoken

After that you will be able to use autocomplete and typecheck even with the JavaScript packages.

### Starting Server

1. Run `npm i` command

2. Run `npm start` command for Starting Project

### Make a DataBase Migration

1. Run `typeorm migration:create -n [NameOfYourChange]` tu create a migration file
2. Run `npm start` to start the server a DataBase
3. Run `npm run migration:run` to update the shema of the DataBase


Finally, your server is ready to go. Just get the Postman, or any other tool, and make some requests.

### Use The API:

1. Login in the API with this route `http://localhost:3000/auth/login` username & password on request body
2. Copy Paste on the AuthKey
3. Copy the AuthKey on the header of your request

### List Of Current Route

**Admin Route:**

GET: `http://localhost:3000/api/users?email=XXX&username=YYY`

GET: `http://localhost:4000/api/users/:userID`

POST: `http://localhost:4000/api/users`

PUT: `http://localhost:4000/api/users/:userID`

DELETE: `http://localhost:4000/api/users/:userID`



