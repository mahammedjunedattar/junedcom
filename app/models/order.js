const mongoose = require('mongoose')


const orderschema = new mongoose.Schema({
    userId : {type : string , required : true},
    products : [{
        productId : {type : string},
        quantity : {type : Number ,default : 1}
    }],
    address : {type : string , reuired : true},
    amount : {type : Number , reuired : true},
    status : {type : Number ,default : Pending, reuired : true},


},{timestamps :true}) ;
export default mongoose.model('order',orderschema)