const mongoose = require('mongoose');

MONGO_URL="mongodb+srv://chatapp:chatapp123@cluster0.8jwgb.mongodb.net/chatapp?retryWrites=true&w=majority"

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{console.log("MongoDB is connected successfully")})
.catch((error)=>{console.log(error);})
