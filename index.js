const express = require('express');
const app = express();
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require('./connect');
const URL = require('./models/url')
const path = require('path');
const staticRoute = require('./routes/staticRouter')
const userRoutes = require('./routes/user')
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly , checkAuth } = require('./middleware/auth')

const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/url',restrictToLoggedinUserOnly,urlRoute);
app.use('/',checkAuth,staticRoute);
app.use('/user',userRoutes);



connectToMongoDB('mongodb://0.0.0.0:27017/short-url')
.then(()=>{
    console.log("mongoDB connected")
})
.catch(()=>{
    console.log("mongoDb connection Error")
})
app.set('view engine','ejs');
app.set('views',path.resolve('./views'))





app.get('/test' , async (req , res)=>{
    const allUrls = await URL.find({});
    res.render('home',{
        urls : allUrls
    });
})



app.get('/url/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
            viewHistory : {
                timestamp:Date.now()
            },
        }
    }
    );
    res.redirect(entry.redirectURL)
})

app.listen(PORT,()=>{
    console.log(`Port listening on ${PORT}`);
})