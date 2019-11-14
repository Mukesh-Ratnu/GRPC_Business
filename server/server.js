// requirements
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
global.Mongoose = require('mongoose');
const businessServices = require('./db/businessdb')
// const newservice = require('./db/businessdb')
const bcrypt = require('bcrypt');


Mongoose.connect('mongodb://localhost/businessDataBase')

// grpc service definition
const businessProtoPath = path.join(__dirname, '..', 'proto', 'business.proto');
const businessProtoDefinition = protoLoader.loadSync(businessProtoPath);
const businessPackageDefinition = grpc.loadPackageDefinition(businessProtoDefinition).business;

console.log("Hello")
function registorBusiness(call, callback) {
    // let obj = call.request


    // let busin = new businessServices({
    //     businessName: obj.businessName,
    //     userName: obj.userName,
    //     email: obj.email,
    //     password: obj.password
    // });

    // return busin.checkEmail(callback).then(async (data)=>{
    //     if(data){
    //         return ({message:"email already used"})
    //     }else {
    //         if(obj.password){
    //             let newPassword = await bcrypt.hash(obj.password, 10)
    //             obj.password = newPassword;
    //             return busin.add(callback); 
    //     }else{
    //         return ({code:400, message:"error in registration"})
    //     }
    // }
    // })

    let obj = call.request
    let busin = new businessServices({
        businessName: obj.businessName,
        userName: obj.userName,
        email: obj.email,
        password: obj.password
    });



    busin.add(callback);

}

function businessDetails(call, callback) {
    console.log("this is businessDetails>>>>>>>>>>>>>>", call)
}

function deleteBusiness(call, callback) {
    console.log("this is delete bussiness function", call)
}

function updateBusiness(call, callback) {
    console.log("updateBusiness", call)
}

function businesslogin(call, callback) {
    let obj = call.request

    let loginbusi = new businessServices({
        email: obj.email,
        password: obj.password
    })

    loginbusi.checkEmail(callback).then((data) => {
        if (!data) {
            console.log("there is found error")
            return res.josn({ code: 400, message: "fall" })
        }
        else {
            if (data) {
                // let password = await compare(data.password, obj.password)
                console.log("valid user")
                // return res.json({ code: 200, message: "success", result: data })
            }
        }
    })


    // newservice.ckeckEmail(callback).then((result)=>{
    //     console.log("this is result of the checked email id found or not found", result)
    // })

    // let obj = call.request
    // if(obj.email){
    //     businessServices.CheckEmail(obj.email)

    // }
}

// main
function main() {
    const server = new grpc.Server();
    // gRPC service
    server.addService(businessPackageDefinition.BusinessService.service, {
        registorBusiness: registorBusiness,
        businessDetails: businessDetails,
        deleteBusiness: deleteBusiness,
        updateBusiness: updateBusiness,
        businesslogin: businesslogin
    });
    // gRPC server
    server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log('gRPC server running at http://127.0.0.1:50051');
}

main();
