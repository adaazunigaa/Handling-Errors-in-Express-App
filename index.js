const { raw } = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();



 app.use(morgan("dev"));
// app.use((req, res, next) =>{
//     console.log("This is my first middleware!");
//     return next();
//     // console.log("this is my first middle ware - after calling next();");
// });
app.use((req, res, next)=> {
    req.requestTime = Date.now();
    next();
});
app.use("/dogs", (req, res, next) => {
    console.log("this is middleware for '/dogs' only!");
next();
});

const verifyPassword = function (req, res, next){
    const { password } = req.query;
    if (password === "nugget"){
        next();
    }
    // res.send("sorry, WRONG password");  
    throw new Error("SECRET ERROR: ->Password Required<-");
};



app.get("/", (req, res) =>{
    console.log("this is the request time: " + req.requestTime)
    res.send("Home page");
});

app.get("/dogs", (req,res)=>{
    res.send("woOF wOOf!")
});

app.get("/secret", verifyPassword, (req,res) => {
    res.send("Hello! this is the secret page!");
});



app.use((req,res) =>{
    res.status(404).send("NOT FOUND");
});

app.use((err, req, res, next)=>{
    console.log("***ERROR****");
    next(err);

} )

app.listen(3000, () =>{
    console.log("App is running on localhost:3000");
});