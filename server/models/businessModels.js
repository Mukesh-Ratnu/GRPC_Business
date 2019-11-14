const Schema = Mongoose.Schema;
let business = new Schema({
  
   "businessName" : {
      type: String,
      required:true
   },
   "userName" : {
      type: String,
      required:true
   },
   "email" : {
    type: String,
    required:true
 },
 "password" : {
  type: String,
  required:true
}

}, {strict: true});

module.exports = Mongoose.model('business', business);