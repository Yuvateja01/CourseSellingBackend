const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const zod = require("zod")
const {Admin, Course} = require("../db/index")
const jwt = require("jsonwebtoken")
require("dotenv").config()


// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const adminSchema = zod.object({
        username:zod.string(),
        password:zod.string().min(6)
    })
    const username = req.body.username;
    const password = req.body.password;
    const adminData = {
        "username":username,
        "password":password
    }
    if(!adminSchema.safeParse(adminData))
        res.status(404).send({"message":"Enter a valid username/password"})
    const adminUser = new Admin({username:username,password:password})
    const data = adminUser.save()
    data.then((val)=>{console.log(val)}).catch((err)=>console.log(err))
    res.status(200).send("Admin User Added")
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.findOne({"username":username,"password":password}).exec();
    if (admin == null){
        res.status(401).send("Wrong Username/Password");
    }
    else{
        const token =  jwt.sign({"username":username},process.env.SECRET_KEY);
        res.status(200).send({"token":token})
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
     const courseSchema = zod.object({
        title:zod.string(),
        description:zod.string(),
        price:zod.number(),
        imageLink:zod.string()
    })

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const courseData = {
        title:title,
        description:description,
        price:price,
        imageLink:imageLink
    }
    if(!courseSchema.safeParse(courseData))
        res.status(404).send("Invalid entries")
    const course = new Course(courseData)
    course.save().then((val)=>console.log(val)).catch((err)=>console.log(err))
    res.send("added course")
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find().exec();
    res.send(courses)
});

module.exports = router;