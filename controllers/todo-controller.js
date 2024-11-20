const ToDo = require('../models/todo');
const User = require('../models/user');
const userMiddleware = require('../middleware/user-middleware')

// Get all the todo task using get method
const getAllTodo = async (req, res) =>{
    const allTodo = await ToDo.find({});
    try{
        if(allTodo.length > 0){
            res.status(200).json({
                success: true,
                message: 'List of Todo Tasks',
                data: allTodo
            })
        }        
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Todo are Not Found'
        })
    }
}

// Get a Single Todo by id
const getSingleTodo = async (req, res) =>{
    const getTodoId = req.params.id;
    const todoDetails = await ToDo.findById(getTodoId)
    try {
        if(todoDetails){
            res.status(200).json({
                success: true,
                message: 'The Single Todo',
                data: todoDetails
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Todo are Not Found'
        })
    }
}

// Add a new todo Task using post method
const addTodo = async (req, res) =>{
    try{
        const getTodoData = req.body;
        const createNewTodo = await ToDo.create(getTodoData);
        if(createNewTodo){
            res.status(200).json({
                success: true,
                message: 'Todo Task Created Successfully',
                data: createNewTodo
            })
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Something Wrong in Add Todo Task. Let Try Again'
        })
        
    }
}

// Get a Single Todo by id
const updateTodo = async (req, res) =>{
    const getCurtTodoId = req.params.id;
    const updateTodoData = req.body;
    const updateTodo = await ToDo.findByIdAndUpdate(getCurtTodoId, updateTodoData, {new: true})
    try {
        if(updateTodo){
            res.status(200).json({
                success: 'Todo Updated Successfully',
                data: updateTodo
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something Wrong in Update Todo Task. Let Try Again'
        })
    }
}

// Get a Single Todo by id
const deleteTodo = async (req, res) =>{
    const getTodoId = req.params.id;
    const deleteTodo = await ToDo.findByIdAndDelete(getTodoId); 
    try {
        if(deleteTodo){
            res.status(200).json({
                success: true,
                message: 'Todo was Deleted Successfully',
                data: deleteTodo
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something Wrong in Delete Todo Task. Let Try Again'
        })
    }
}
module.exports = {
    addTodo,
    getAllTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo
}