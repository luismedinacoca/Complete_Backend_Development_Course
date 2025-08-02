//const mongoose = require("mongoose");
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config(); // Carga las variables de entorno desde el archivo .env

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
    // create a new document
    // TODO: create() es más robusto porque maneja la creación y la persistencia en una sola llamada, evitando problemas de estado.
    // both ways to create a new user:
    
    const newUser = await User.create({ 
      name: 'Updated User',
      email: 'updated_user@gmail.com',
      age: 48,
      isActive: false,
      tags: ['QA', 'Developer', 'backend', 'junior'],
    });

    console.log('1️⃣  New user created →→', newUser);
    

    // find all users
    //const allUsers = await User.find({})
    //console.log('2️⃣ All users ->', allUsers);
    
    // find a user by id
    //const userById = await User.findById('687fe588be7854a73b8d6dc2')
    //console.log('3️⃣ User by id ->', userById);

    // find users with isActive false
    //const getUserIsActiveFalse = await User.find({isActive: false});
    //console.log("4️⃣ Users with isActive false ->", getUserIsActiveFalse);

    // find users with name = "John Doe":
    //const getUserByName = await User.findOne({name: "John Doe"});
    //|q|console.log("5️⃣ Users with name = 'John Doe' ->", getUserByName);

    // find last created user by id:
    //const getLastCreatedUserByUserId = await User.findById(newUser._id);
    //console.log('6️⃣ Last created user by id ->', getLastCreatedUserByUserId);

    // select fields: name, email and hide _id:
    //const selectedFields = await User.find().select('name email -_id');
    //console.log('7️⃣ Selected fields ->', selectedFields);

    // limit users:
    //const limitedUsers = await User.find().limit(3).skip(1);
    //console.log('8️⃣  Limited users → →', limitedUsers);

    /* 👀 ⚠️
    DESC: const sortedUsers = await User.find().sort({age: -1});
    ASC: const sortedUsers = await User.find().sort({age: 1});

    Orden ascendente por nombre (A → Z):
    const sortedUsersByName = await User.find().sort({name: 1});
    Orden descendente por nombre (Z → A):
    const sortedUsersByNameDesc = await User.find().sort({name: -1});
    👀  */
    // sort users: ASC
    //const sortedUsers = await User.find().sort({age: 1});
    //console.log('9️⃣  Ascending sorted users → →', sortedUsers);

    //
    //const isActiveTrueCountDocuments = await User.countDocuments({ isActive: true });
    //console.log(' 1️⃣ 0️⃣ Count documents with isActive true ->', isActiveTrueCountDocuments);

    //const isActiveFalseCountDocuments = await User.countDocuments({ isActive: false });
    //console.log(' 1️⃣ 1️⃣ Count documents with isActive false ->', isActiveFalseCountDocuments);
    
    //const deleteUser = await User.findByIdAndDelete(newUser._id);
    //console.log('1️⃣ 2️⃣  Deleted user ->', deleteUser);

    const updatedUser = await User.findByIdAndUpdate(
      newUser._id, 
      {
        $set:{age:  49}, 
        $push:{tags: 'updated'},
      },
      {
        new:  true
      }
    );
    console.log('1️⃣ 3️⃣  Updated user ->', updatedUser); 
  } catch(err){
    console.log('Error ->', err);
  }finally{
    mongoose.connection.close();
  }
}

runQueryExamples(); // run runQueryExamples function.