const express = require('express');
const {verifyToken,checkRole} = require('../middleware/auth');

const router = express.Router();

const content = [
    {id: '1', title: 'Getting Started with Node.js',author:'admin'},
    {id: '2', title: 'Express Middleware Explained',author:'editor'},
];

//GET /api/content - all authenticated users
router.get('/', verifyToken, checkRole('user', 'editor' ,'admin'), (req,res) => {
    res.json({content});
})

//POST /api/content - editors and admins only
router.post('/', verifyToken,checkRole('editor','admin'),(req,res)=>{
    const {title} = req.body;

    if(!title) {
        return res.status(400).json({message: 'Title is required'});
    }

    const newItem = {
        id: Date.now().toString(),
        title,
        author: req.user.email,
    };

    content.push(newItem);
    res.status(201).json({message: ' Content created', item: newItem});
});

// DELETE /api/content/:id -admin only
router.delete('/:id',verifyToken,checkRole('admin'),(req,res) => {
    const index = content.findIndex((c) => c.id === req.params.id);

    if(index == -1){
        return res.status(404).json({message: 'Content not found '});
    }

    content.splice(index,1);
    res.json({message: 'Content deleted successfully'});
})

module.exports = router;