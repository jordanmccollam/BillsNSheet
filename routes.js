const express = require('express');

const BillCtrl = require('./controllers/bill-ctrl');
const UserCtrl = require('./controllers/user-ctrl');

const router = express.Router();

router.post('/user', UserCtrl.createUser);
router.get('/user/:email', UserCtrl.getUser);

router.post('/bill', BillCtrl.createBill);
router.put('/bill/:id', BillCtrl.updateBill);
router.delete('/bill/:id', BillCtrl.deleteBill);
router.get('/bills/', BillCtrl.getBills);

module.exports = router;