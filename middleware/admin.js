const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    console.log(req.headers.username)
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];
    const isVaild = jwt.verify(token,process.env.SECRET_KEY);
    if(isVaild)
    next();
    else
    res.send("Incorrect/Expired auth token")
    
}

module.exports = adminMiddleware;