const mongoose= require('mongoose')
const localStrategy = require('passport-local').Strategy
const bcrypt= require('bcryptjs')

// Model - Db
require('../models/user')
const Usuario = mongoose.model('usuarios')

// Autenticação 

module.exports= function (passport){

    passport.use(new localStrategy(
        {usernameField:'email', passwordField:'senha'},
        (email,senha,done)=>{
            Usuario.findOne({email:email}).then((usuario)=>{
                if(!usuario){
                    return done (null,false,{message:'Esse usuário não existe!'})
                }
                bcrypt.compare(senha,usuario.senha,(erro,batem)=>{
                    if(batem){
                        return done(null,usuario,{message:'Logado com sucesso!'})
                    }
                    else{
                        return done(null,false,{message:'Senha incorreta'})
                    }
                })
            })
        }
    ))
    passport.serializeUser((usuario, done)=>{
        done(null,usuario.id)
    })

    passport.deserializeUser((id, done)=>{
        Usuario.findById(id).then((usuario)=>{
            done(null,usuario)
        }).catch((err) =>{
            done(err)})
    })
}