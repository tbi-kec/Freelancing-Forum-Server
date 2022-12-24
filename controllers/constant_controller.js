const Constant = require('../model/constant')


module.exports.getdomain = async (req, res) => {
    const result = await Constant.find({});
    res.status(200).json(result)
}

module.exports.upload = async (req, res) => {
    const data = {
        domain: [
            "Web Developer",
            "App Developer",
            "Full Stack Developer",
            "Flutter Developer",
            "React Native Developer",
        ],
        dept_short: [
            {
                dept: 'Civil Engineering',
                short: 'CIVIL'
            },
            {
                dept: 'Mechanical Engineering',
                short: 'MECH'
            },
            {
                dept: 'Mechatronics Engineering',
                short: 'MTR'
            },
            {
                dept: 'Automobile Engineering',
                short: 'AUB'
            },
            {
                dept: 'Chemical Engineering',
                short: 'CHEM'
            },
            {
                dept: 'Food Technology',
                short: 'FT'
            },
            {
                dept: 'Electrical and Electronics Engineering',
                short: 'EEE'
            },
            {
                dept: 'Electronics and Instrumentation Engineering',
                short: 'EIE'
            },
            {
                dept: 'Electronics and Communication Engineering',
                short: 'ECE'
            },
            {
                dept: 'Computer Science and Engineering',
                short: 'CSE'
            },
            {
                dept: 'Information Technology',
                short: 'IT'
            },
            {
                dept: 'Computer Science and Design',
                short: 'CSD'
            },
            {
                dept: 'Artificial Intelligence (AIML & AIDS)',
                short: 'AIML & AIDS'
            },
            {
                dept: 'Management Studies',
                short: 'MBA'
            },
            {
                dept: 'Computer Technology - UG',
                short: 'CT-UG'
            },
            {
                dept: 'Computer Technology - PG',
                short: 'CT-PG'
            }


        ]
    }
    const result = await new Constant(data);
    await result.save();
    res.status(200).json(result)
}