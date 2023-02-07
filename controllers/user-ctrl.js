const User = require('../models/user-model');

getUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Error getting users` })
        }
        return res.status(200).json({ success: true, output: users })
    })
}

getUser = async (req, res) => {
    await User.findOne({ email: req.params.email })
    .populate("bills")
    .exec((err, user) => {
        var output_user = user;

        if (err) {
            return res.status(400).json({ success: false, error: err, message: "Something went wrong"})
        }
        if (!user) {
            // USER NOT FOUND -> CREATE NEW USER
            return res.status(200).json({ success: false, err: "User not found" })
        }

        return res.status(200).json({ success: true, output: output_user })
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
    createUser,
    getUsers
}