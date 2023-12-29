const mongoose = require('mongoose');
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:{type:String, unique:true},
    password:String
});


const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:{type:String, unique:true},
    description:String,
    price:Number,
    imageLink:String
});

const Course = mongoose.model('Course', CourseSchema);

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:{type:String, unique:true},
    password:String,
    purchasedCourses:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);


module.exports = {
    Admin,
    User,
    Course
}