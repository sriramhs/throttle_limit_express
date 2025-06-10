const express = require('express');
const router = express.Router();

router.get("/",(_req,res)=>{
    res.send("users");
})

router.get("/new",(_req,res)=>{
    res.send("new user");
})

module.exports = router 