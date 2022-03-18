const express = require("express");
const path = require("path");
const app = express();
const socketIo = require("socket.io");

app.use("/", express.static(path.join(__dirname, "public")));

const server = app.listen(3000, () => {
  console.log("Server running");
});

const io = socketIo(server);

const messages = [];

io.on("connection", (socket) => {
  console.log("new connection");
  socket.emit("update_messages", messages);

  socket.on("new_message", (data) => {
    messages.push(data);

    io.emit("update_messages", messages);
  });
});
