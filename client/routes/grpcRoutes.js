// requirements
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

// gRPC client
const businessProtoPath = path.join(__dirname, '..', '..', 'proto', 'business.proto');
const businessProtoDefinition = protoLoader.loadSync(businessProtoPath);

const businessPackageDefinition = grpc.loadPackageDefinition(businessProtoDefinition).business;

const client = new businessPackageDefinition.BusinessService(
    'localhost:50051', grpc.credentials.createInsecure());

// registor business
const createBusiness = (req, res) => {
    let obj = req.body
    const payload = {
        businessName: obj.businessName,
        userName: obj.userName,
        email: obj.email,
        password: obj.password
    };

    client.registorBusiness(payload, (err, result) => {
        if (err) {
            return res.json({ code: 400, message: err });

        } else {
            return res.json({ code: 200, message: "successfull", message: result });

        }
    });
};


const businessDetails = (req, res) => {
    let payload = { id: req.params.id }
    // const payload = { id: parse(req.params.id) };
    console.log("payload", payload)
    client.businessDetails(payload, (err, result) => {
        if (err) {
            return res.json({ code: 400, message: "error", err: err })
        } else {
            return res.json({ code: 200, message: "successful", result: result })
        }
    })

}

// delete business
const deleteBusiness = (req, res) => {
    let payload = { id: req.params.id }
    console.log("payload", payload)

    client.deleteBusiness(payload, (err, result) => {
        if (err) {
            return res.json({ code: 400, message: "error" })
        } else {
            return res.json({ code: 200, message: "Delete successfully" })
        }
    })
}

// update business
const updateBusiness = (req, res) => {
    let payload = { id: req.params.id }
    console.log("payload", payload)

    client.updateBusiness(payload, (err, result) => {
        if (err) {
            return res.json({ code: 400, message: "error" })
        } else {
            return res.json({ code: 200, message: "Updated", result: result })
        }
    })
}

// for login into business
const businesslogin = (req, res) => {

    let payload = {
        email: req.body.email,
        password: req.body.password
    }

    client.businesslogin(payload, (err, result) => {
        if (err) {
            return res.json({ code: 400, message: "check your email & password" })
        } else {
            return res.json({ code: 200, message: "successfully logged in", result: result })
        }
    })
}

module.exports = {
    createBusiness,
    businessDetails,
    deleteBusiness,
    updateBusiness,
    businesslogin
}