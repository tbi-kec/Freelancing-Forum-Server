const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const StudyProject = require('../model/studyProject')


module.exports.signup = async (req, res) => {
    const data =  {...req.body}
    
    try {
        const existinguser = await User.findOne({ kongu_email : data.kongu_email })
        if (existinguser) {
            return res.status(400).json({ message: 'User already found..' })
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User(data)
        console.log(newUser)
        await newUser.save();
        const token = jwt.sign({ email: newUser.newUser.kongu_email, id: newUser._id }, 'token', { expiresIn: '1h' })
            res.status(200).json({ result: newUser, token })
    } catch (err) {
        console.log(err.message)
        res.status(500).json('Something went worng...')
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existinguser = await User.findOne({ kongu_email:email })
        if (!existinguser) {
            console.log("User not found...");
            return res.status(404).json({ message: "User not found..." })
        }
        const isPasswordCrt =await  bcrypt.compare(password, existinguser.password)
        if (!isPasswordCrt) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, 'token', { expiresIn: '48h' })
         res.status(200).json({ result: existinguser, token })
    
    } catch(err) {
        console.log(err.message)
        res.status(500).json(err.message)
    }
}