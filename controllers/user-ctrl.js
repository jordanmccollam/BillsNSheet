const User = require('../models/user-model');

getUser = (req, res) => {
    User.findOne({ email: req.params.email })
    .populate('bills')
    .exec((err, user) => {
        if (err) return res.status(400).json({ success: false, error: err });
        return res.status(200).json({ success: true, output: user })
    })
}

createUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a user"
        })
    }

    const user = new User(body)
    if (!user) {
        return res.status(400).json({
            success: false,
            error: "Something went wrong creating this user"
        })
    }

    user.save().then(() => {
        return res.status(201).json({
            success: true,
            message: "user successfully created!",
            output: user
        })
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: ("user not CREATED due to error: ", err)
        })
    })
}

module.exports = {
    getUser,
    createUser
}