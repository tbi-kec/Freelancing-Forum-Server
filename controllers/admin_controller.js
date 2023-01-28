const Project = require('../model/projects')
const ProjectHistory = require('../model/projecthistory')
const User = require('../model/user')
const DeletedUser =require('../model/deletedUser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { notify_user, notify_both_user } = require('../controllers/mail')
const Admin = require('../model/admin')

module.exports.new_admin = async (req, res) => {
    const { first_name, last_name, kongu_email, password, mobile_number } = req.body 
        try {
            const existinguser = await Admin.findOne({ kongu_email: kongu_email })
            if (existinguser) {
                return res.status(400).json('Admin already found..')
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const newAdmin = new Admin({ first_name, last_name, kongu_email,  mobile_number , password: hashPassword})
            await newAdmin.save();
            res.status(200).json("Created Admin successfully")
        } catch (err) {
            console.log(err.message)
            res.status(500).json('Something went worng...')
        }
}

module.exports.requested_project = async (req, res) => {
    try {
        const project = await Project.find({}).populate('createdBy').populate('developer')
        res.status(200).json(project)
    } catch (e) {
        res.status(500).json(e)

    }
}


module.exports.admin_response = async (req, res) => {
    try {
        const { status, p_id, message } = req.body
        // console.log(p_id,status)
        if (status == 'accepted') {
            const project = await Project.findByIdAndUpdate(p_id, { project_status: "pending-user",admin_acceptedOn:Date.now() }).populate('createdBy').populate('developer')
            // const projecthistory = await ProjectHistory.find({ project_status: 'pending-user' }).populate('from')
            console.log(project);
            const user = await User.findById(project.developer._id)
            const provider = await User.findById(project.createdBy._id)

            //user notification
            user.notification.push({
                p_id: project._id,
                message: `You(${user.first_name}) Requested for a project(${project.title}) by ${provider.first_name}.`,
                notify_type: 1,
                notify_from:`${provider.first_name}`
            });
            //provider notification
            provider.notification.push({
                p_id: project._id,
                message: `Your Project(${project.title}) requested to ${user.first_name} is Accepted by Admin,waiting for freelancer response.`,
                notify_type: 0,
                notify_from:"Admin"
            });
            user.save();
            provider.save();
            project.save();
            // mail
            await notify_both_user(project.developer.kongu_email, 'You are Requsted to Do The Project !Pleace Check your Notification Panal',
                project.createdBy.kongu_email, 'Your requested Project is Accepted By the Admin')
            res.status(200).json('Accepted!')
        }
        else {
            const project = await Project.findByIdAndUpdate(p_id, { project_status: 'created', developer: null }).populate('createdBy');
            // const projecthistory = await ProjectHistory.findAndUpdate({ project_id: p_id }, { project_status: 'created', to: '' });
            const user = await User.findById(project.createdBy._id)
            user.notification.push({
                p_id: project._id,
                message: `Your Project(${project.title}) requested to ${user.first_name} is Rejected by Admin,because "${message}"`,
                notify_type: 0,
                notify_from:"Admin"
            });
            await user.save();
            //mail
            await notify_user(project.createdBy.kongu_email, `Your requested Project is Rejected By the Admin\nReason:${message}`)
            res.status(200).json('Project Rejected!')
        }
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }

}


//user verification

module.exports.user_verify=async(req,res)=>{
    try{
        const {status,u_id,message}=req.body
        if(status=="accepted"){
            const user =await User.findById(u_id);
            user.admin_verify=true;
            await user.save()
            await notify_user( user.kongu_email, `Your Profile verification is Approved by Admin`)
            res.status(200).json('User Verified Successfully')
        } else {
            const user = await User.findByIdAndDelete(u_id);
            const {first_name,last_name,rollno,kongu_email,personal_email,mobile,department,linkedin,github,created_on}=user
            const deleteduser=new DeletedUser({first_name,last_name,rollno,kongu_email,personal_email,mobile,department,linkedin,github,created_on});
            deleteduser.rejected_on=Date.now();
            deleteduser.reason=message;
            await deleteduser.save()
            await notify_user(user.kongu_email, `Your Profile verification is rejected by Admin\nReason:${message}`)
            res.status(200).json('User Rejected Successfully')
        }
    } catch (e) {   
        console.log(e.message)
        res.status(500).json(e)
    }
}

 