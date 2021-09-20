const express = require('express');
//body parser must be with express together
var bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const fileUpload = require('express-fileupload')
app.use(fileUpload())

let port = process.env.PORT;
if(port == null || port == ""){
    port = 4000;
}

app.listen(port, ()=>{
    console.log('App listening')
})

//connect to mongod db 
const mongoose = require('mongoose');
// const BlogPost = require('./models/BlogPost');
// const mongodbAPI = require('./Keys/mongodbAPI')
mongoose.connect('mongodb+srv://jerryChen:Je-112233@cluster0.wdmoq.mongodb.net/my_database', {useNewUrlParser: true})

//static file does not show up, you have to use public to make it work
app.use(express.static('public'))

//validation middleware
const validationMiddleWare = require('./validationMiddleware/validationMiddleware')

app.use('/posts/store',validationMiddleWare)

//express session
const expressSession = require('express-session');
// const sessionSecret = require('./Keys/sessionSecret');
app.use(expressSession({
    secret: "funny cat"
}))

//if log in, do not show show nav links
global.loggedIn = null;
app.use('*', (req, res, next)=>{
    loggedIn = req.session.userId;
    // console.log(loggedIn)
    next()
});

const newPostController = require('./controllers/postNewBlog');
const homeController = require('./controllers/home');
const getPostContoller = require('./controllers/getPost')
const logInController = require('./controllers/Login')
const signupController = require('./controllers/Signup')
const storePostController = require('./controllers/storePost')
const storeUserController = require('./controllers/StoreUser')
const loginUserController = require('./controllers/LoginUser');
const authMiddleware = require('./validationMiddleware/authMiddleware')
const redirectIfAuthMiddleware = require('./validationMiddleware/redirectIfAuthMiddleware')
const logoutController = require('./controllers/logout')

// const path = require('path');
const ejs = require('ejs');

app.set('view engine', 'ejs')

app.get('/', homeController)

//user click on a single blog
app.get('/post/:id', getPostContoller)
app.get('/Login',redirectIfAuthMiddleware, logInController)
// app.get('/Signup',redirectIfAuthMiddleware, signupController)
app.get('/postNewBlog', authMiddleware, newPostController)
app.post('/posts/store',authMiddleware, storePostController)
app.post('/users/register', redirectIfAuthMiddleware,storeUserController)
app.post('/users/login', redirectIfAuthMiddleware,loginUserController)
app.get('/logout', logoutController)


// //USER SEARCH to be used in the future
// app.post('/posts/search', (req, res)=>{
//     console.log(req.body)
// })

//notfound 404
app.use((req, res)=> res.render('notfound'))





