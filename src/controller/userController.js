const userModel = require("../Model/userModel.js")
const validator = require('validator')
const bcrypt = require("bcrypt");


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};



//======+++++++++========+++++++=========={ Register User }======+++++++========++++++++==========//

const Register = async function (req, res) {
    try {
        const data = req.body;
        const { email, password1, password2 } = data

        if (Object.keys(data) == 0) return res.status(400).send({ status: false, message: "please enter details" })

        if (!isValid(email)) return res.status(400).send({ status: false, message: "please enter Email" })

        if (!validator.isEmail(email.trim())) return res.status(400).send({ status: false, message: "Entered Email is invalid" })

        const usedEmail = await userModel.findOne({ email: email })

        if (usedEmail) return res.status(409).send({ status: false, message: "This email is already registered" })

        if (!isValid(password1)) return res.status(400).send({ status: false, message: "please enter password....." })

        if (!isValid(password2)) return res.status(400).send({ status: false, message: "please enter confirm password" })

        if (password1 !== password2) return res.status(400).send({ status: false, message: "confirm password does not matches" })

        if (!validator.isStrongPassword(password1.trim()))  return res.status(400).send({ status: false, message: "Entered Password is not strong" })


        let userData = {
            email: email,
            password: password1
        }

        const passwordHash = await bcrypt.hash(password1, 10);
        
        userData.password = passwordHash;

        let user = await userModel.create(userData)

        res.status(201).send({ status: true, message: "Registration Successful", data: user })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

//======+++++++++========+++++++=========={ Login User }======+++++++========++++++++==========//

const Login = async function (req, res) {
    try {
        const email = req.body.email;

        const password = req.body.password;

        if (Object.keys(req.body) == 0) return res.status(400).send({ status: false, message: "please enter details" })

        if (!isValid(email)) return res.status(400).send({ status: false, message: "please enter Email" })

        if (!validator.isEmail(email.trim())) return res.status(400).send({ status: false, message: "Entered Email is invalid" })

        if (!isValid(password)) return res.status(400).send({ status: false, message: "please enter password" })

        let user = await userModel.findOne({ email: email });

        if (!user) return res.status(400).send({ status: false, message: "email is not available", });

        let userPassword = await bcrypt.compareSync(password, user.password);

        if (!userPassword) return res.status(401).send({ status: false, message: "Password is not correct" });

        return res.status(200).send({ status: true, message: "Login Successful", user: user })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


//======+++++++++========+++++++=========={ Exports }======+++++++========++++++++==========//

module.exports = { Register, Login }
