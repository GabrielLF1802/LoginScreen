const express= require('express')
const router = express.Router()
const mongoose= require('mongoose')
require('../models/user')
const Usuario = mongoose.model('usuarios')
const passport= require('passport')
const bcrypt= require('bcryptjs')




// Routes Usuário

router.get('/',(req,res)=>{
    res.render('user/home')
})

router.get('/register',(req,res)=>{
    res.render('user/register')
})
router.post('/register',(req,res)=>{

    let erros= []

    if(!req.body.nome|| req.body.nome == undefined || req.body.nome == null){
        erros.push({texto:'Nome inválido'})
    }
    if(!req.body.email||req.body.email == undefined|| req.body.email == null){
        erros.push({texto:'Email inválido'})
    }
    if(!req.body.senha || req.body.senha == undefined || req.body.senha == null){
        erros.push({texto:'Senha inválida'})
    }
    if(!req.body.nasc || req.body.nasc == undefined || req.body.nasc == null){
        erros.push({texto:'Data de nascimento inválida'})
    }
    if (req.body.senha != req.body.senha2){
        erros.push({texto:'As senhas não conhecidem'})
    }
    if (req.body.senha.length<4){
        erros.push({texto:'Senha muito curta'})
    }
    if(erros.length>0){
        res.render('user/register',{erros:erros})

    }else{
        Usuario.findOne({email:req.body.email}).then((usuario)=>{
            if(usuario){
                req.flash('error_msg','Email já cadastrado')
                res.render('user/register')
            }else{
                const newUser= new Usuario({
                    nome:req.body.nome,
                    senha: req.body.senha,
                    nasc: req.body.nasc,
                    email: req.body.email
                })
                bcrypt.genSalt(10,(erro,salt)=>{
                    bcrypt.hash(newUser.senha , salt, (erro,hash)=>{
                        if(erro){
                            req.flash('error_msg','Erro no sistema de cadastro')
                            res.redirect('/user/')
                        }
                        newUser.senha= hash
                        newUser.save().then(()=>{
                            req.flash('success_msg','Usuário criado com sucesso!')
                            console.log('Usuario criado com sucesso!')
                            res.redirect('/user/')
                        }).catch((err)=>{
                            req.flash('error_msg','Falha ao criar novo usuário')
                            console.log('Falha ao criar o usuário')
                            res.render('user/register')
                })
                        
                })

                })
                

            
            }

            
        }).catch((err)=>{
            req.flash('error_msg','Email já cadastrado')
            res.redirect('/user/register')
        })

    }
})

router.get('/login',(req,res)=>{
    res.render('user/login')
})
router.post('/login',(req,res, next)=>{
    passport.authenticate('local',{
        failureRedirect:'/user/login',
        failureFlash:true,
    })(req,res,()=>{
        req.flash('success_msg','Logado com sucesso!')
        res.redirect('/user/')
    })
})


module.exports= router