import app from "./app/app.js";
import http from "http";
import { Server } from "socket.io";

import path from "path";
import { chatSocket } from "./app/sockets/chatSocket.js";

const port = process.env.PORT || 4000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get('/',(req,res)=>{
  res.sendFile(path.resolve('./app/public/index.html'))
})

io.on("connection", (socket) => {
  console.log("room", socket.rooms);
  console.log("user connected", socket.id);
  chatSocket(io, socket);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
