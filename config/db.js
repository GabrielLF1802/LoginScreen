if(process.env.NODE_ENV=='production'){
    module.exports={mongoURI:'mongodb+srv://gabriel:Jklx18xx!@cluster0.0sgx6iw.mongodb.net/'}
}else{
    module.exports={mongoURI:'mongodb://localhost/login'}
}