const express = require("express");
const userRouter = require("./routes/userRouter");
const app = express()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(express.json())
app.use("/users",userRouter)


app.get("/",(req,res)=>{
   res.send("Welcome to Home page!")
})

// app.get("/users",async(req,res)=>{
//     try {
//         const response = await fetch("https://jsonplaceholder.typicode.com/users");
//         const data = await response.json();
//         console.log(data);
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(400).send("Internal Server Problem");
//     }
// })

app.get("/posts",async(req,res)=>{
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await response.json()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send("Internal Server Problem");
    }
})

app.post("/posts/add",async(req,res)=>{
    
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts",{
            method : "POST",
            body:JSON.stringify(req.body),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json()
        res.status(200).send({msg:"Data added successfully!",data})
    } catch (error) {
        res.status(400).send("Internal Server Problem");
    }
})

app.listen(8080,()=>{
    console.log("Server is listening on port 8080")
})