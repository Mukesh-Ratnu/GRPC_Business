let businessModel = require('../models/businessModels')

let Business = class {
    constructor(payload) {
 
       this.payload = payload;
    }



add(cb) {
    console.log("this is payload>>>>>>>>>>>", this.payload)
    new businessModel(this.payload).save(cb);
 }

 checkEmail(cb){
     let query= {
         email:this.payload.email
     }
     console.log("this is checking email", query)
     return businessModel.findOne(query, cb)

 }
 
}

module.exports = Business;