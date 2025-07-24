const express= require('express')
const app= express()
const mongoose= require('mongoose')
const {engine} = require('express-handlebars')
const path= require('path')
const bodyParser= require('body-parser')
const session= require('express-session')
const flash= require('connect-flash')
const usuario= require('./routes/user')
require('./models/user')
const Usuario= mongoose.model('usuarios')
const db= require('./config/db')
const passport=require('passport')
require('./config/auth')(passport)




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

// Session
app.use(session({
    secret:"loginexpress",
    resave:true,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

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

app.use('/user',usuario)














// Ligação do servidor
const PORT= process.env.PORT || 8081
app.listen(PORT||8081,()=>{
    console.log('Server started!')
})