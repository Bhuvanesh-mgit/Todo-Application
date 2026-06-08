import Todo from "../Model/Todomodel.js";

const getTodos = async (req, res) => {
  let todos = await Todo.find({
    userId: req.user._id,
  });
  res.send(todos);
};
const createTodo = async (req, res) => {
  let { title, description , userId} = req.body;
  let todo = await Todo.create({
    title,
    description,
    userId,
  });

  res.send(todo);
};

const getTodoById = async (req, res) => {
    let {id}=req.params;
    let todo = await Todo.findById(id);
    res.send(todo);
}

const deleteTodo=async(req,res)=>{
  let {id}=req.query
  let todo = await Todo.findByIdAndDelete(id);
  res.json({message:"Todo deleted successfully"}  );
}

const updateTodo=async(req,res)=>{
  const {id,title,description,isCompleted}=req.body
  let todo = await Todo.findByIdAndUpdate(id, { title, description, isCompleted });
  res.send(todo);
}
export { getTodos, createTodo, getTodoById, deleteTodo, updateTodo };
