//node+mongo connection
const mongoose = require('mongoose') //import

mongoose.connect('mongodb://localhost:27017/CMS') //connection string

const contact = mongoose.model('contact',{
    id:String,
    name:String,
    address:String,
    phone:String,
    email:String
})
module.exports={
    contact
}