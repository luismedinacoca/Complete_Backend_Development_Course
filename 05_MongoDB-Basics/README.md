1. Create a new project then run 
```bash
npm init -y 
``` 
and install dotenv dependency
```bash
npm i dotenv
```
2. Install `mongoose`
```bash
npm i mongoose
```

[**`Mongodb - Atlas`**]

3. create a new account in `mongodb.com`
4. When mongodb account is create, click on up  left side dropdown in order to create a new project:  `+ New Project`  option
5. Give a project name n `Name your project` textfield, then click on `Next` button.
6. Click on `create Project` button.
7. Need to create a `Cluster` in order to connect the database.
8. Click on `+ Create` button  on Overview | Create a cluster
9. Click on `M0` or `Free`, keep the `Cluster0`, the `Provider`.
10. Click on `Create Deployment` button.
11. Connect to Cluster0 window pops up, so save **`Username`** and **`Password`** which are displayed in `2. Create a database user`. Save this information in `.env` file.
12. Click on `Create Database User` button.
13. Click on `Choose a connection method` button.
14. In case cluster is not created, click on `Network Access` bar menu option. In Network Access page, it shows an `inactive`  cluster.
15. Click on `+ ADD IP ADDRESS` button. Then Add IP access List entry window pops up.
16. Click on `ALLOW ACCESS FROM ANYWHERE` button then click on `Confirm` button.
17. Click on `Database` menu option.

[**`VS Code`**]

18. create `app.js` file then update the `package.json` file as `"main": "app.js",`

[**`Mongodb - Atlas`**]

19. When cluster is created, in `Access your data through tools` section click on `MongoDB for VS Code` option.
20. Connecting with  MongoDB for VS Code window pops up. In `3. Connect to your MongoDB deployment` section, save or copy the displayed link: **`mongodb+srv://<ddb_username>:<db_password>@cluster0.acdc.mongo.net/`**.

[**`VS Code`**]

21. Add the following code in `app.js` file:
```js
  /********** app.js **********/
  import mongoose from "mongoose";
  import dotenv from "dotenv";

  // Import the dotenv package and load environment variables from `.env` file
  dotenv.config(); 

  // connect to the database
  mongoose.connect(`mongodb+srv://${process.env.MONGODB_USR}:${process.env.MONGODB_PWD}@cluster0.AceOfBase.mongodb.net/`)
    .then(() => console.log('database connected sccessfully'))
    .catch((err) => console.log(err))
```
22. Create a schema for new user:
```js
  // define the schema
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: {
      type: Date,
      default: Date.now, 
    }
  });
```
23. Create the user model
```js
// create User model
const User = mongoose.model('User', userSchema);
```
24. create an async function for run the Query:
```js
async function runQueryExamples(){
  try{
    // create a new document
    const newUser = await User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
      isActive: true,
      tags: ['developer', 'designer'],
    });

    console.log('New user created ->', newUser);
  } catch(err){
    console.log('Error ->', err);
  }finally{
    mongoose.connection.close();
  }
}
runQueryExamples(); // run runQueryExamples function.
```
or 
```js
async function runQueryExamples(){
  try{
    const newUser = new User({
      name: 'Jane Doe',
      email: 'jane.doe@example.io',
      age: 25,
      isActive: true,
      tags: ['developer', 'designer', 'manager'],
    });
    await newUser.save();

    console.log('New user created ->', newUser);
  } catch(err){
    console.log('Error ->', err);
  }finally{
    mongoose.connection.close();
  }
}
runQueryExamples(); // call runQueryExamples function.
```
25. Go to terminal and execute:
```bash
node app.js
```
26. Verify the terminal outcome and the Atlas/Compass:
<img src="./images/mongodb-basics-001-object_created.png">

27. Comment the creation part and add:
```js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 
// connect to the database
mongoose
  .connect(`mongodb+srv://luismedinacoca:${process.env.MONGODB_PWD}@cluster0.t4yb8se.mongodb.net/`)
  .then(() => console.log('database connected sccessfully'))
  .catch((err) => console.log(err));
// define the schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now, 
  }
});
// create User model
const User = mongoose.model('User', userSchema);
async function runQueryExamples(){
  try{
    /*
    const newUser = await User.create({
      name: 'Juan Perez',
      email: 'juan.perez@example.com',
      age: 30,
      isActive: true,
      tags: ['developer', 'designer', 'manager'],
    });

    console.log('New user created ->', newUser);
    */
    // find all users
    const allUsers = await User.find({})
    console.log('All users ->', allUsers);
    
    // find a user by id
    //const userById = await User.findById('64b800000000000000000000')
    //console.log('User by id ->', userById);

  } catch(err){
    console.log('Error ->', err);
  }finally{
    mongoose.connection.close();
  }
}
runQueryExamples(); // run runQueryExamples function.
```
28. 
29. 
30. 
31. 
32. 
33. 
34. 



