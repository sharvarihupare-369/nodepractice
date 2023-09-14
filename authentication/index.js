const express = require("express")
const app = express()
require("dotenv").config()
const connection = require("./config/db")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
app.get("/",(req,res)=>{
    res.send("Base Api EndPoint!")
})

//Github oauth service provider --> 
app.get("/login",async(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.get("/auth/github",async(req,res)=>{
    const {code} = req.query
    console.log(code)
    const accessToken = await fetch("https://github.com/login/oauth/access_token",{
        method:"POST",
        headers : {
            "Content-type":"application/json",
             Accept : "application/json"
        },
        body : JSON.stringify({
            client_id : process.env.CLIENT_ID,
            client_secret : process.env.CLIENT_SECRET,
            code : code
        })
    }).then((res)=>res.json())
    console.log(accessToken)
    console.log(accessToken)

    const userDetails = await fetch("https://api.github.com/user",{
        headers : {
            Authorization: `Bearer ${accessToken.access_token}`
        }
    })
    const data = await userDetails.json()
    console.log(data)
    res.send('Signup in progress')
})


app.listen(process.env.PORT || 5000,async()=>{
    try {
        await connection 
        console.log("Connetced to DB")
    } catch (error) {
        console.log("Connected to DB failed")
        console.log(error)
    }
    console.log(`Server is listening on port ${process.env.PORT}`)
})