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


        ],
        icons: [
            {
                dept: "MECH",
                icon: "Engineering",
            },
            {
                dept: "IT",
                icon: "Desktop Mac",
            },
            {
                dept: "EIE",
                icon: "Precision Manufacturing",
            },
            {
                dept: "CSE",
                icon: "Computer",
            },
            {
                dept: "EEE",
                icon: "Bolt",
            },
            {
                dept: "AUB",
                icon: "Directions Car"
            },
            {
                dept: "FT",
                icon: "Restaurant Menu",
            },
            {
                dept: "CIVIL",
                icon: "Apartment",
            },
            {
                dept: "AIML & AIDS",
                icon: "Robot",
            },
            {
                dept: "CHEM",
                icon: "Science",
            },
            {
                dept: "MTR",
                icon: "Construction",
            },
            {
                dept: "ECE",
                icon: "Satellite Alt",
            },
            {
                dept: "CSD",
                icon: "Podcasts",
            },
        ]
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