const express = require('express');

const BillCtrl = require('./controllers/bill-ctrl');

const router = express.Router();

// TASKS
// router.post('/bill', BillCtrl.createTask);
// router.put('/bill/:id', BillCtrl.updateTask);
// router.delete('/bill/:id', BillCtrl.deleteTask);
router.get('/bills', BillCtrl.getBills);

module.exports = router;