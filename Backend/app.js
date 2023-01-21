const express=require ('express');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var cors=require('cors');
var path=require('path');
const { Console } = require('console');
const route=require('./routes/route');

var app=express();

const port=3000;

//connect to mongo db
mongoose.connect('mongodb://127.0.0.1:27017/TaskManager');

//when connected
mongoose.connection.on('connected',()=>{
    console.log('connected to database');
})

//if error when connecting to database
mongoose.connection.on('error',(err)=>{
    console.log('error connecting to database: '+err);
})

//adding middleware=cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));


//routes
app.use('/api',route);
//testing server
app.get('/',(req,res)=>{
    res.send('Hello');
});

app.listen(port,()=>{
    console.log('Server is running at port: '+port);
});