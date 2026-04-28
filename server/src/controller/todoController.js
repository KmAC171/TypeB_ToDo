const Todo = require('../models/Todo.js');

exports.getAllTodos = async (requestAnimationFrame, res) => {
    try{
        const todos = await Todo.find().sort({ createdAt: -1});
        res.json(todods);
    } catch (error) {
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

