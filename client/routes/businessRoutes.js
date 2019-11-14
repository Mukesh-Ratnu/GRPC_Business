const express = require('express');
const grpcRoutes = require('./grpcRoutes');

// new router
const router = express.Router();

router.post('/registorbusiness', grpcRoutes.createBusiness);
router.post('/businessslogin', grpcRoutes.businesslogin);
router.get('/businessDetails/:id', grpcRoutes.businessDetails)
router.delete('/deletebusiness/:id', grpcRoutes.deleteBusiness)
router.put('/updatebusiness/:id', grpcRoutes.updateBusiness)

module.exports = router;

