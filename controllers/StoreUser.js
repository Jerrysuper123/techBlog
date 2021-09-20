const User = require('../models/User');
// const path = require('path');

module.exports = (req, res)=>{
    User.create(req.body, (error, user)=>{
        // console.log(error);
        if(error){
            return res.redirect('/Signup')
        }
        res.redirect('/')
    })
}