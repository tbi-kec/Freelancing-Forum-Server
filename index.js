
//Common Importing Statements
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path")
const dotenv = require('dotenv')

//routes
const userRoutes = require('./routes/user_routes')
const projectRoutes = require('./routes/project_routes')

//initilizing
const app = express()
app.use(express.static(path.join(__dirname, "/public")))
dotenv.config()
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// //db connection
// mongoose.connect(process.env.DB).then(() => {
//     console.log('Db connection open')
// }).catch(err => {
//     console.log(err.message, 'oops err');
// });


app.use('/user', userRoutes)
app.use('/project', projectRoutes)




//listening port
//port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`)
}
)