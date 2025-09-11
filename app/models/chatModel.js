import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: false,default:"" },
});

const chatModel = mongoose.models.chat || mongoose.model("chat", chatSchema);
export default chatModel;
