const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {findUserByEmail,createUser} = require('../data/users');

const router = express.Router();

// POST /api/auth/register
router.post('/register',async(req,res) => {
    const {name,email,password,role} = req.body;

    if(!name || !email || ! password){
        return res.status(400).json({
            message :'Name, email, and password are required '
        });
    }

    if(findUserByEmail(email)){
        return res.status(409).json({
            message: 'Email already generated '
        });
    }

    const validRoles = ['user','editor','admin'];
    const assignedRole = validRoles.includes(role)?role : 'user';

    const hashedPassword = await bcrypt.hash(password,10);
    
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        role: assignedRole,
    };

    createUser(newUser);

    res.status(201).json({
        message:'User registered successfully',
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        },
    });
});

// POST /api/auth/register
router.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({message: "email and password are required "});
    }

    const user = findUserByEmail(email);
    if(!user){
        res.status(401).json({message: 'Invalid credentials '});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        res.status(401).json({message: 'Invalid credentials '});
    }

    const token = jwt.sign(
        {
            id:user.id,
            email:user.email,
            role:user.role,

        },
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    );

    res.json({
        message: 'Login successful',
        token,
    });
});

module.exports = router;