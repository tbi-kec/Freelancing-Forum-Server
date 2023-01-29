const Certificate = require('../model/certificate')
const Project = require('../model/projects')

module.exports.newcertificate = async (req, res) => {
    const { p_id } = req.body

    try {
        const project = await Project.findById(p_id);
        const certificate = new Certificate({project:project,certificate_no:"1234"});
        certificate.save();
        res.status(200).json('Certificate Added')
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
    }
}

module.exports.generatecertificate = async (req, res) => {
    const { p_id } = req.body

    try {
        const certificate = await Certificate.findOne({ project: p_id }).populate('createdBy').populate('developer');
        const time=Date.now();
        res.status(200).json(certificate,time)
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
    }
}
