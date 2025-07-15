const express= require('express')
const app= express()
const mongoose= require('mongoose')
const {engine} = require('express-handlebars')
const path= require('path')
const bodyParser= require('body-parser')
require('./models/user')
const Usuario= mongoose.model('usuarios')

// Config

// Body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Handlebars
app.engine('handlebars',engine({defaultLayout:'main', runtimeOptions:{
    allowedProtoPropertiesByDefault:true,
    allowedProtoMethodsByDefault:true
}}))
app.set('view engine', 'handlebars')

// Public
app.use(express.static(path.join(__dirname,'public')))



// Routes
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/register',(req,res)=>{
    res.render('register')
})


















// Ligação do servidor
const PORT= process.env.PORT || 8081
app.listen(PORT||8081,()=>{
    console.log('Server started!')
})