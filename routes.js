const express = require('express');

const BillCtrl = require('./controllers/bill-ctrl');

const router = express.Router();

// TASKS
router.post('/bill', BillCtrl.createBill);
router.put('/bill/:id', BillCtrl.updateBill);
router.delete('/bill/:id', BillCtrl.deleteBill);
router.get('/bills', BillCtrl.getBills);

module.exports = router;