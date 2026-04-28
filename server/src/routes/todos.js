const express = require('express');
const router = express.Router();

const todoController = require('../controller/todoController.js');

router.get('/', todoController.getAllTodos);
router.post('/', todoController.create);
router.put('/:id', todoController.update);
router.patch('/:id/done', todoController.toggleDone);
router.delete('/:id', todoController.remove);

module.exports = router;