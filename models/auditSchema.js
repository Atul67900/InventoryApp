const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
    productname:{
        type:String,
        // required:true,
        trime:true
    },
    productcode:{
        type:String,
        // required:true,
        trime:true
    },
    qiqty:{
        type:String,
        // required:true,
        trime:true,
        minlength:1,
        maxlength:1000
    },
    productsku:{
        type:String,
        // required:true,
        trime:true
    },
    remquantity:{
        type:String,
        trime:true,
        maxlength:1000
    },
    productbin:{
        type:String,
        // required:true,
        trime:true,
        minlength:1,
        maxlength:1000
    },
    datecreated:Date
})

//model

const audit = new mongoose.model("audit", auditSchema)

module.exports = audit;