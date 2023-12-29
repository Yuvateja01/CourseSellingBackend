const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db/index")
const zod = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config()


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const userSchema = zod.object({
        username:zod.string(),
        password:zod.string().min(6)
    })
    const username = req.body.username;
    const password = req.body.password;
    const userData = {
        "username":username,
        "password":password
    }
    if(!userSchema.safeParse(userData))
        res.status(404).send({"message":"Enter a valid username/password"})
    const user = new User({username:username,password:password,purchasedCourses:[]})
    const data = user.save()
    data.then((val)=>{console.log(val)}).catch((err)=>console.log(err))
    res.status(200).send(" User Added")
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({"username":username,"password":password}).exec();
    if (user == null){
        res.status(401).send("Wrong Username/Password");
    }
    else{
        const token =  jwt.sign({"username":username},process.env.SECRET_KEY);
        res.status(200).send({"token":token})
    }
});

router.get('/courses', userMiddleware,async(req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find().exec();
    res.send(courses)
});

router.post('/courses/:title', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const token = req.headers.authorization.split(" ")[1]
    const username = jwt.decode(token).username;
    const title = req.params.title;
    console.log(title)
    const course = await Course.findOne({"title":title}).exec()
    if(course == null)
    res.send("No Course Found")
    else{
        console.log(course)
        const user = await User.findOne({"username":username}).exec();
        user.purchasedCourses.push(course._id);
        console.log(user)
        const res = await user.save();
        console.log(user.purchasedCourses)
        if (res == null)
        console.log("error in user update")
        else
        console.log("Done")
    }
    res.send("Course Added")
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const token = req.headers.authorization.split(" ")[1]
    const username = jwt.decode(token).username;
    let purchasedCourses = []
    const user = await User.findOne({"username":username}).exec();
    // can also use promise.all and resolve all finds at once
    //can use $isin of mongodb too :)
    for(let i=0;i<user.purchasedCourses.length;i++)
    {
        const course = await Course.findById(user.purchasedCourses[i]).exec();
        purchasedCourses.push(course)
    }
    res.send(purchasedCourses)
});

module.exports = router