
//Common Importing Statements
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path")
const dotenv = require('dotenv')
const cors=require("cors")
//routes
const userRoutes = require('./routes/user_routes')
const adminRoutes = require('./routes/admin_routes')
const projectRoutes = require('./routes/project_routes')
const studyProjectRoutes = require('./routes/study_project_routes');
const constantsRoutes = require('./routes/constants_routes')
const certificateRoutes = require('./routes/certificate_routes')
const { constants } = require('buffer');

//initilizing
const app = express()
app.use(express.static(path.join(__dirname, "/public")))
dotenv.config()
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//db connection
mongoose.connect(process.env.DB).then(() => {
    console.log('Db connection open')
}).catch(err => {
    console.log(err.message, 'oops err');
});

app.use(express.static(path.join(__dirname,process.env.CLIENTBASE ||'./build')));

app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/certificate', certificateRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/study',studyProjectRoutes)
app.use('/api/constants',constantsRoutes)

//default route
app.get('/api/',(req,res)=>{
    res.send("FreelancingForum")    
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,process.env.CLIENTBASE ||'./build', 'index.html'));
});


//listening port
//port
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`)
}
)