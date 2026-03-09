const mongoose = require('mongoose');


const watchListSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.ObjectId,
        ref : 'User',
    },
     
    productId:{
        type : mongoose.Schema.ObjectId,
        ref : 'Product'
    }
},{ timestamps: true })

module.exports = mongoose.model('watchList',watchListSchema )