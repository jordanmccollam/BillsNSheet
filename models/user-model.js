const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { type: String, required: true , unique: true},
        income: { type: Number, required: true },
        bills: [{ type: Schema.Types.ObjectId, ref: 'bills' }]
    },
    { timestamps: true },
);

module.exports = mongoose.model('users', User);