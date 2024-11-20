const express = require('express');
const app = express();
const connectToDB = require('./database/db')
const PORT = process.env.PORT || 3000;
const todoRoute = require('./routes/todo-routes')
const userRoute = require('./routes/user-routes')

// Using middleware to use the express.json
app.use(express.json());

// Connect DB here
connectToDB();

// All routes here
app.use('/api/todo', todoRoute);
app.use('/api/user', userRoute);

// Start the port here using listener
app.listen(PORT, () =>{
    console.log(`The Server is Now Running on Port ${PORT}`);
})