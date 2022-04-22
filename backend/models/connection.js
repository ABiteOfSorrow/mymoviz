var mongoose = require('mongoose')

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


mongoose.connect('mongodb+srv://rupo:aa6690266@cluster0.v7luh.mongodb.net/myMoviz?retryWrites=true&w=majority',
options,function(error){
    if(error){
        console.log(error)
    } else {
        console.log("connection OK!")
    }
    }
);