const audit = require("../models/auditSchema");
const moment = require("moment");
// const BASE_URL = process.env.BASE_URL

// register

exports.auditpost = async(req,res)=>{
    const {productname, productcode, qiqty, productsku, remquantity, productbin} = req.body;

    if(!productname || !productcode || !qiqty || !productsku || !remquantity || !productbin){
        res.status(401).json("All Inputs are Required")
    }
    try {
        const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss A")

        const auditData = new audit({
            productname, productcode, qiqty, productsku, remquantity, productbin, datecreated
        });
        await auditData.save();
        res.status(200).json(auditData)
    } catch (error) {
        res.status(401).json(error);
        console.log("Catch Block error");
    }
}


// get all audits

exports.auditget = async(req,res)=>{
    const auditsearch = req.query.auditsearch || ""
    const sort = req.query.sort || ""
    const page = req.query.page || 1
    const ITEM_PER_PAGE = 10;
    const query = {
        productsku : {$regex:auditsearch,$options:"i"}
    }
    try {
        const skip = (page - 1) * ITEM_PER_PAGE 

        const count = await audit.countDocuments(query)
        
        const auditsData = await audit.find(query)
        .sort({datecreated:sort == "new" ? -1 : 1}) 
        .limit(ITEM_PER_PAGE)
        .skip(skip)

        const pageCount = Math.ceil(count/ITEM_PER_PAGE);

        res.status(200).json({
            Pagination:{
                count,pageCount
            },
            auditsData
        })
    } catch (error) {
        res.status(401).json(error);
        console.log("New Catch Block error");
    }
}
