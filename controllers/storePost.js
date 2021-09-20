const BlogPost = require('../models/BlogPost');
const path = require('path');


module.exports = async (req, res) => {
    // console.log(req.body);
    await BlogPost.create(
        req.body
    )
    res.redirect('/')

}