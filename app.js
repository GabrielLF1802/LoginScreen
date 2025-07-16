const express= require('express')
const app= express()
const mongoose= require('mongoose')
const {engine} = require('express-handlebars')
const path= require('path')
const bodyParser= require('body-parser')
const flash= require('connect-flash')

require('./models/user')
const Usuario= mongoose.model('usuarios')
const db= require('./config/db')

// Config

// Body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Mongoose
mongoose.Promise= global.Promise
mongoose.connect(db.mongoURI).then(()=>{
    console.log('Conectado ao mongodb com sucesso!')
}).catch((err)=>{
    console.log('Erro ao se conectar com o mongodb' + err)
})

//Middleware
app.use((req,res,next)=>{
    res.locals.success_msg= req.flash('success_msg')
    res.locals.error_msg= req.flash('error_msg')
    res.locals.error= req.flash('error')
    res.locals.user= req.user || null
    next()
})

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
app.post('/register'),(req,res)=>{
    const newUser= {
        nome:req.body.nome,
        senha: req.body.senha,
        nasc: req.body.nasc,
        email: req.body.email
    }
    new Usuario(newUser).then()
}


















// Ligação do servidor
const PORT= process.env.PORT || 8081
app.listen(PORT||8081,()=>{
    console.log('Server started!')
})