require('dotenv').config();
const express = require('express');

const authRoutes= require('./routes/auth');
const contentRoutes = require('./routes/content');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.json());

//Routes

app.use('/api/auth',authRoutes);
app.use('/api/content',contentRoutes);
app.use('/api/admin',adminRoutes);

app.get('/',(req,res)=>{
    res.json({message: 'RBAC API is running'});
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,() =>{
    console.log(`server running on port ${PORT}`);
})