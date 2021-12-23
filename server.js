// import express from "express";
const express = require("express");
const req = require("express/lib/request");
const mongoose = require("mongoose");
const mobiles = require("./models/mobiles");

//models


mongoose.connect(``,() => {
    console.log(`database connected`);
})


const app = express();

app.use(express.json());


//fetching all mobiles
app.get('/', async(req, res) => {
    const mobileCollections= await mobiles.find()
    res.json(mobileCollections)
})

//posting a mobile
app.post('/', async(req, res) => {
    console.log(req.body);
    const createdMobile= await mobiles.create(req.body)
    res.json(createdMobile)
})

//search by brand name and mobile name
app.post(`/search`,async(req,res)=>{
    console.log(req.body);
    const {name,brand}=req.body
    const result= await mobiles.find({$or:[{brand:{$regex:`${brand}`}},{name:{$regex:`${name}`}}]})
    console.log(result);
    res.json(result)
})

//sort by name
app.get('/sortbyname', async(req, res) => {
    const result= await mobiles.find().sort({name:1})
    res.json(result)
})

//pricelowtohigh
app.get('/pricelowtohigh', async(req, res)=>{
    const result= await mobiles.find().sort({price:1})
    res.json(result)
})

//pricehightolow
app.get('/pricehightolow', async(req, res)=>{
    const result= await mobiles.find().sort({price:-1})
    res.json(result)
})

//sortbyrating
app.get('/sortbyrating', async(req, res)=>{
    const result= await mobiles.find().sort({rating:1})
    res.json(result)
})

app.listen(3000,() => {
    console.log(`server runnig`);
})