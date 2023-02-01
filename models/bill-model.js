const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = new Schema(
    {
        description: { type: String, required: true },
        amount: { type: Number, required: true, default: false },
        date: { type: String, required: true, default: false },
    },
    { timestamps: true },
);

module.exports = mongoose.model('bills', Bill);