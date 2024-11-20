const express = require('express');
const {addTodo, getAllTodo, getSingleTodo, updateTodo, deleteTodo} = require('../controllers/todo-controller')
const userMiddleware = require('../middleware/user-middleware')

// Create Router here
const router = express.Router();

// All routes related to the todo 

router.post('/add', userMiddleware, addTodo);
router.get('/get', userMiddleware, getAllTodo);
router.get('/get/:id', userMiddleware, getSingleTodo);
router.put('/update/:id', userMiddleware, updateTodo);
router.delete('/delete/:id', userMiddleware, deleteTodo)

module.exports = router;