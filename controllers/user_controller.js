const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const Project = require('../model/projects')
const Admin = require('../model/admin')
const StudyProject = require('../model/studyProject')
const { notify_both_user } = require('./mail')


module.exports.signup = async (req, res) => {
    const { first_name, last_name, kongu_email, password, mobile, rollno, user_type } = { ...req.body }

    try {
        const existinguser = await User.findOne({ kongu_email })
        if (existinguser) {
            return res.status(400).json('User already found..')
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ first_name, last_name, kongu_email, rollno, user_type, password: hashPassword, mobile })
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
        const user = await User.findById(id).populate('work_history').populate('study_project').populate('projects_given').populate('onbord_project')
            .populate({
                path: 'projects_given',
                populate: {
                    path: 'requested',
                }
            }).populate({
                path: 'notification',
                populate: {
                    path: 'p_id',
                }
            });
        res.status(200).json(user)
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }

}

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).populate('work_history').populate('study_project').populate('projects_given').populate('onbord_project')
            .populate({
                path: 'notification',
                populate: {
                    path: 'p_id',
                }
            });
        res.status(200).json(users)
    } catch (error) {

        res.status(500).json(error)
    }
}
module.exports.update_profile = async (req, res) => {
    const { id } = req.body

    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json('User Not Found')
        }
        const updateduser = await User.findByIdAndUpdate(id, { ...req.body })
        await updateduser.save()
        res.status(200).json('updated Successfully')

    } catch (e) {
        res.status(500).json(e)
    }


}

module.exports.delete_notification = async (req, res) => {
    try {
        const { u_id, n_id } = req.body;
        console.log(req.body)
        const user = await User.findById(u_id)
        await user.notification.remove(n_id);
        await user.save();
        res.status(200).json('Deleted  Successfully')
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }

}


module.exports.getDomin_user = async (req, res) => {
    try {
        const domain_name = req.body.domain_name;
        const users = await User.find({ domain: { $in: [domain_name] } });
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json(e);
    }
}
module.exports.getDept_user = async (req, res) => {
    try {
        const dept_name = req.body.dept_name;
        const users = await User.find({ department: { $in: [dept_name] } });
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json(e);
    }
}

module.exports.study_project = async (req, res) => {
    try {
        const user = await User.findById(req.body.createdBy);
        const user_project = new StudyProject({ ...req.body });
        user_project.save();
        user.study_project.push(user_project)
        res.status(200).json('Added Successfully');
    } catch (e) {
        console.log(e.message)
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

module.exports.update_rating = async (req, res) => {
    try {
        const { rating, u_id, p_id } = req.body;
        const user = await User.findById(u_id);
        const project = await Project.findById(p_id).populate('createdBy');
        //user update
        if (user.rating == 0) {
            user.rating = rating;
        }
        else {
            user.rating = (user.rating + rating) / 2;
        }
        user.work_history.push(project);
        await user.onbord_project.remove(p_id)
        user.notification.push({
            p_id: project,
            message: `Successfully Completed the Project with rating ${user.rating}`,
            notify_type: 0,
        });
        // project update
        project.completed_on = Date.now();
        project.createdBy.notification.push({
            p_id: project,
            message: `Your Project is Completed`,
            notify_type: 0,
        });
        project.project_status = 'completed';
        await project.createdBy.onbord_project.remove(p_id)

        await notify_both_user(user.kongu_email, `Successfully Completed the Project with rating ${user.rating}.Congratulations from Freelancer Forum Team.Give the feedback on kec_tbi2022.kongu.edu`,
            project.createdBy.kongu_email, `Congratulation Your Project (${project.title}) is completed.Please Check your Profile.Give the feedback on kec_tbi2022.kongu.edu`)
        await user.save();
        await project.save();
        res.status(200).json('Project Completed Successfully!')
    } catch (e) {
        res.status(500).json(e)
    }

}


module.exports.editProfile = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByIdAndUpdate(id, { ...req.body });
        await user.save();
        res.status(200).json("Successfully Edited")
    } catch (error) {
        res.status(500).json(e)
    }
}