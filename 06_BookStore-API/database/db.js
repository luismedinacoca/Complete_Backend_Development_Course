const mongoose =require('mongoose');
const connectToDB = async() => {
  try{
    await mongoose.connect(`mongodb+srv://luismedinacoca:${process.env.CLUSTER_PWD}@cluster0.jsoddpx.mongodb.net/`)
    console.log("Mongodb is connected Successfully!")
  }
  catch(err){
    console.error('Mongodb connection failed', err);
    process.exit(1);
  }
}
module.exports=  connectToDB;