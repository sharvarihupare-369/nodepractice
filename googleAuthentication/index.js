const express = require("express")
const app = express()
require("dotenv").config()
const connection = require("./config/db")
const passport = require("./config/google-oauth")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
app.get("/",(req,res)=>{
    res.send("Base Api EndPoint!")
})

app.get("/login",async(req,res)=>{
    // res.sendFile(__dirname + '/index.html')
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));



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