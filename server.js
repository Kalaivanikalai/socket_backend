const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


app.get('/',(req,res)=>{
  res.send("its running!");
})

MONGO_URL="mongodb+srv://chatapp:chatapp123@cluster0.8jwgb.mongodb.net/chatapp?retryWrites=true&w=majority"

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{console.log("Database connected")})
.catch((error)=>{console.log(error);})

const PORT=process.env.PORT || 5000;

const server = app.listen(PORT, () =>{
  console.log(`Server started on ${PORT}`)
}
);

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
