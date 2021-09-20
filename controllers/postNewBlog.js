module.exports = (req, res)=>{
    if(req.session.userId){
        return res.render('postNewBlog',{
            createPost: true
        })
    }
    res.render('/Signup')
}