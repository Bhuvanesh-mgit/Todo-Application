import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
   userId: {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
