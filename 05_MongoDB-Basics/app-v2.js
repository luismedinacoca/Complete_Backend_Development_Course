import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://luismedinacoca:${process.env.MONGODB_PWD}@cluster0.t4yb8se.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connected successfully");
    runQueryExamples()
      .then(() => {
        mongoose.connection.close(); // Cierra la conexión solo después de completar las operaciones
      });
  })
  .catch((err) => {
    console.error("Connection error:", err.message);
    if (err.name === "MongooseServerSelectionError") {
      console.error(
        "Check your IP whitelist in MongoDB Atlas: https://www.mongodb.com/docs/atlas/security-whitelist/"
      );
    }
    mongoose.connection.close(); // Cierra en caso de error
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
  try {
    /*
    const newUser = new User({
      name: "John Doe",
      email: "jane.doe@example.com",
      age: 25,
      isActive: true,
      tags: ["developer", "designer", "manager"],
    });
    await newUser.save();
    
    console.log("New user created ->", newUser);
    */

    const allUsers = await User.find({})
    console.log('All users ->', allUsers);

    
  } catch (err) {
    console.log("Error ->", err);
    throw err; // Propaga el error para que se maneje en el .catch externo
  }
}