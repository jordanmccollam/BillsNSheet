const Bill = require('../models/bill-model');

getBills = (req, res) => {
    Bill.find({}, (err, bills) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bills.length) {
            return res
                .status(404)
                .json({ success: false, error: `Error getting bills` })
        }
        return res.status(200).json({ success: true, output: bills })
    })
}

createBill = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a bill"
        })
    }

    const bill = new Bill(body)
    if (!bill) {
        return res.status(400).json({
            success: false,
            error: "Something went wrong creating this bill"
        })
    }

    bill.save().then(() => {
        return res.status(201).json({
            success: true,
            message: "Bill successfully created!",
            output: bill
        })
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: ("Bill not CREATED due to error: ", err)
        })
    })
}

deleteBill = (req, res) => {
    Bill.findOneAndDelete({ _id: req.params.id }, (err, bill) => {
        if (!err) {
            return res.status(200).json({ success: true, output: req.params.id });
        } else {
            return res.status(400).json({ success: false, error: err });
        }
    })
}

updateBill = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Bill.findOne({ _id: req.params.id }, (err, bill) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Bill not found!',
            })
        }

        // CONTENT TO UPDATE
        bill.description = body.description;
        bill.amount = body.amount;
        bill.date = body.date;

        bill.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    output: bill,
                    message: 'Bill updated!',
                })
            })
            .catch(err => {
                return res.status(404).json({
                    success: false,
                    message: ("Bill not UPDATED due to error: ", err)
                })
            })
    })
}

module.exports = {
    getBills,
    createBill,
    deleteBill,
    updateBill
}