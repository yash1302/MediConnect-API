import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  participants: { type: [String], required: true },
});

const chatRoomModel = mongoose.model("chatRoom", chatRoomSchema);
export default chatRoomModel;
