const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register User 
const registerUser = async (req, res) => {
    try {
        const { username, password} = req.body;

        // Check if user already exists
        const checkExistingUser = await User.findOne({ username });
        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists.'
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const createUser = new User({
            username,
            password: hashedPassword,
            
        });

        await createUser.save();

        return res.status(201).json({
            success: true,
            message: 'User created successfully'
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: 'An error occurred, please try again.'
        });
    
    }
};


// Login User 
const loginUser = async (req, res) =>{
    try{
        const {username, password} = req.body;

        // Check the username in DB
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        // Check password in DB
        const isCheckPassword = await bcrypt.compare(password, user.password);
        if(!isCheckPassword){
            return res.status(404).json({
                success: false,
                message: "Invalid Password"
            });
        }

        // Create token
        const token = jwt.sign({
            userId: user._id,
            username: user.username
        }, process.env.JWT_SECRET_KEY, {expiresIn: '30m'})

        return res.status(201).json({
            success: true,
            message: 'Logged in successfully',
            token
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'An error occurred, please try again.'
        });
    }
}

module.exports = {
    registerUser,
    loginUser
}