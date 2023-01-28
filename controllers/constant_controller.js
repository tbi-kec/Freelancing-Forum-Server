const Constant = require('../model/constant')


module.exports.getdomain = async (req, res) => {
    try {
        const result = await Constant.find({});
        res.status(200).json(result)
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }

}

module.exports.upload = async (req, res) => {
    const data = {
        domain: [
            "Mechanical CAD",
            "3D printing and design",
            "Mechanical Fabrication work",
            "IoT",
            "Circuit design and fabrication",
            "Electrical works",
            "Embedded Systems Simulation and Fabrication",
            "Application creation using python",
            "Web page design and hosting",
            "Programming Skills (eg:. C, C#, python, etc)",
            "Report Writing (From event registration to Certificate Writing)",
            "Multimedial Preparation (Videos Preparation, Promos)",
            "Poster Designing (Poster, Banner, Certificate Design)",
            "Photography (Photos, Videos and Documentations)",
            "Android Application Development",
            "Mobile Application Development using Flutter",
            "Building Machine Learning/Deep Learning model",
            "UI/UX designing",
            "Full Stack Development"
        ],
        dept_short: [
            {
                dept: 'Civil Engineering',
                short: 'CIVIL',
                icon: 'Apartment',
            },
            {
                dept: 'Mechanical Engineering',
                short: 'MECH',
                icon: 'Engineering',
            },
            {
                dept: 'Mechatronics Engineering',
                short: 'MTR',
                icon: 'Construction',
            },
            {
                dept: 'Automobile Engineering',
                short: 'AUB',
                icon: 'Directions Car'
            },
            {
                dept: 'Chemical Engineering',
                short: 'CHEM',
                icon: 'Science',
            },
            {
                dept: 'Food Technology',
                short: 'FT',
                icon: 'Restaurant Menu',
            },
            {
                dept: 'Electrical and Electronics Engineering',
                short: 'EEE',
                icon: 'Bolt'
            },
            {
                dept: 'Electronics and Instrumentation Engineering',
                short: 'EIE',
                icon: 'Precision Manufacturing',
            },
            {
                dept: 'Electronics and Communication Engineering',
                short: 'ECE',
                icon: 'Satellite Alt',
            },
            {
                dept: 'Computer Science and Engineering',
                short: 'CSE',
                icon: 'Computer'
            },
            {
                dept: 'Information Technology',
                short: 'IT',
                icon: 'Desktop Mac'
            },
            {
                dept: 'Computer Science and Design',
                short: 'CSD',
                icon: 'Podcasts',
            },
            {
                dept: 'Artificial Intelligence (AIML & AIDS)',
                short: 'AIML & AIDS',
                icon: 'Robot',
            },
            {
                dept: 'Management Studies',
                short: 'MBA',
                icon: 'Auto Stories',
            },
            {
                dept: 'Computer Technology - UG',
                short: 'CT-UG',
                icon: 'Dvr',
            },
            {
                dept: 'Computer Technology - PG',
                short: 'CT-PG',
                icon: 'Dvr',
            }


        ],
    }
    try {
        const result = new Constant(data);
        await result.save();
        res.status(200).json(result)
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e)
    }

}