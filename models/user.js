const mongoose= require('mongoose')
const Schema= mongoose.Schema

const Usuario= new Schema({
    nome:{
        type:String,
        required:true
    },
    senha:{
        type:String,
        required:true
    },
    nasc:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})
mongoose.model('usuarios',Usuario)