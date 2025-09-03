import chatModel from "../models/chatModel.js";

export const chatSocket = (io, socket) => {
  socket.on("join_room", (userId) => {
    socket.userId = userId;
    socket.join(userId);
    console.log(`user ${userId} joined the chat`);
  });

  socket.on("private_message", async ({ senderId, receiverId, message }) => {
    try {
      console.log(senderId, receiverId, message);
      const chat = new chatModel({ senderId, receiverId, message });
      await chat.save();

      io.to(receiverId).emit("private_message", {
        senderId,
        message,
        timestamp: chat.timestamp,
      });

      io.to(senderId).emit("private_message", {
        senderId,
        message,
        timestamp: chat.timestamp,
      });
    } catch (err) {
      console.error("Chat Error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
};
