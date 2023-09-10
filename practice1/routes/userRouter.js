const express = require("express");
const userRouter = express.Router();
// import fetch from "node-fetch";
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


userRouter.get("/", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Internal Server Problem");
  }
});


module.exports = userRouter;
