if(process.env.NODE_ENV=='production'){
    module.exports={mongoURI:'link banco de dados'}
}else{
    module.exports={mongoURI:'mongodb://localhost/login'}
}