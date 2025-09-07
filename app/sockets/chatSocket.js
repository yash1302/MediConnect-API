import chatModel from "../models/chatModel.js";

export const chatSocket = (io, socket) => {
  socket.on("join_room", (roomId) => {
    socket.roomId = roomId;
    socket.join(roomId);
    console.log(`roomId: ${roomId}`);
  });
 
  socket.on(
    "private_message",
    async ({ senderId, receiverId, message, roomId }) => {
      try {
        console.log(senderId, receiverId, message);
        const chat = new chatModel({ senderId, receiverId, message });
        await chat.save();

        io.to(roomId).emit("private_message", {
          senderId,
          receiverId,
          message,
          roomId,
          timestamp: chat.timestamp,
        });

        io.to(roomId).emit("private_message", {
          senderId : receiverId,
          receiverId : senderId,
          message,
          roomId,
          timestamp: chat.timestamp,
        });
      } catch (err) {
        console.error("Chat Error:", err);
      }
    }
  );

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
};
