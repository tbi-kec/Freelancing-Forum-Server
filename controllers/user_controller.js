const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const Admin = require('../model/admin')
const StudyProject = require('../model/studyProject')
const { findById } = require('../model/user')


module.exports.signup = async (req, res) => {
    const { first_name, last_name, kongu_email, password, mobile } = { ...req.body }

    try {
        const existinguser = await User.findOne({ kongu_email })
        if (existinguser) {
            return res.status(400).json('User already found..')
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ first_name, last_name, kongu_email, password: hashPassword, mobile })
        await newUser.save();
        const token = jwt.sign({ email: newUser.kongu_email, id: newUser._id }, 'token', { expiresIn: '1h' })
        res.status(200).json({ user: newUser, token })
    } catch (err) {
        console.log(err.message)
        res.status(500).json('Something went worng...')
    }
}

module.exports.login = async (req, res) => {
    const { kongu_email, password } = req.body;
    try {
        var existinguser = await User.findOne({ kongu_email })
        if (!existinguser) {
            existinguser = await Admin.findOne({ kongu_email })
            if (!existinguser) {
                console.log("User not found...");
                return res.status(404).json("User not found...")
            }
        }
        const isPasswordCrt = await bcrypt.compare(password, existinguser.password)
        if (!isPasswordCrt) {
            return res.status(400).json("Password Incorrect")
        }
        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, 'token', { expiresIn: '48h' })
        res.status(200).json({ user: existinguser, token })
    } catch (err) {

        res.status(500).json(err.message)
    }
}
module.exports.get_user = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('work_history').populate('study_project').populate('projects_given').populate('onbord_project').populate('notification');
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e)
    }

}

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).populate('work_history').populate('study_project').populate('projects_given').populate('onbord_project').populate('notification');
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports.update_profile = async (req, res) => {
    const id = req.body.id

    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json('User Not Found')
        }
        const updateduser = await User.findByIdAndUpdate(id, { ...req.body })
        updateduser.save()
        res.status(200).json('Created Successfully')

    } catch (e) {
        res.status(500).json(e)
    }

}

module.exports.delete_notification = async (req, res) => {
    try {
        const { u_id, p_id } = req.params;
        const user = await User.findById(u_id).populate('notification');
        user.notification = user.notification.filter(item => item.p_id !== p_id);
        await user.save();
        res.status(200).json('Deleted  Successfully')
    } catch (e) {
        res.status(500).json(e)
    }

}


module.exports.getDomin_user = async (req, res) => {
    try {
        const { domain_name } = req.params;
        const users = await User.find({ domain: { $in: [domain_name] } });
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json(e);
    }
}
module.exports.getDept_user = async (req, res) => {
    try {
        const { dept_name } = req.params;
        const users = await User.find({ department: { $in: [dept_name] } });
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json(e);
    }
}

// module.exports.sendOtp = () => {
//     const { kongu_email, otp } = req.body;
//     try {

//     } catch (error) {

//     }
// }

module.exports.updateskills = () => {

}

module.exports.study_project = () => {

}

