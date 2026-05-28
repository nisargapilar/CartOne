const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
// dotenv.config();
const port = process.env.PORT||5000;

app.get("/api/test",(req,res)=>{
  res.status(200).send("Your tests are here");
});

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
});