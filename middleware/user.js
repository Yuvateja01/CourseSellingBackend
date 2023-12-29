const jwt = require("jsonwebtoken");
require("dotenv").config();

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    console.log(req.headers.authorization)
    if (!req.headers.authorization)
    res.send("Auth Token missing");
    const token = req.headers.authorization.split(" ")[1];
    const isVaild = jwt.verify(token,process.env.SECRET_KEY);
    if(isVaild)
    next();
    else
    res.send("Incorrect/Expired auth token");
}

module.exports = userMiddleware;