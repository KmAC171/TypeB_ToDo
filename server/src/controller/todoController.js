const Todo = require('../models/Todo.js');

exports.getAllTodos = async (req, res) => {
    try{
        const todos = await Todo.find().sort({ createdAt: -1});
        res.json(todos);
    } catch (error) {
      console.error(error);
        res.status(500).json({
            message: 'Server Error',
        });
    }
};

exports.create = async (req, res) => {
    const { title, description } = req.body;
    if (!title?.trim()) return res.status(400).json({ message: 'Title is required'});

    try{
        const todo = await Todo.create({ title, description });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Servr error'}); 
    }
};

exports.update = async (req, res) => {
  const { title, description } = req.body;
  if (!title?.trim()) return res.status(400).json({ message: 'Title is required' });
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.toggleDone = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};