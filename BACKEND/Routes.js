const express = require('express');
const route = express.Router();
const CLAIMS = require('./ClaimFormSchema');
const ITEM = require("./ItemSchema");
const JWT = require('jsonwebtoken');
const bcryt = require('bcrypt');
const USER = require('./userSchema')
const mongoose = require('mongoose');
// const userSchema = require('./userSchema');
const verifyToken = async (req, res, next) => {

    const authorization = req.headers.authorization;
    console.log("=>", authorization)
    if (authorization) {
        const token = authorization.split(" ")[1];
        JWT.verify(token, 'SECRET_KEY', (error, user) => {
            if (error)
                res.status(404).send("You are not authenticated!!");
            else
                next();
        })
    }
    else {

        res.status(422).send("You are not Authenticated!!")
    }
}

route.get('/verifyToken', verifyToken, (req, res) => {
    res.send('AUTHENTICATED!!!')
})


route.get("/item", async (req, res) => {
    try {

        const result = await ITEM.find().sort({ _id: -1 });

        if (result)
            return res.status(200).send(result);
        else
            return res.status(404).send("NOT found data events");



    }
    catch (err) {
        // console.log(err);
        return res.status(422).send("cannot fetch data");
    }
})

route.get("/claim", async (req, res) => {
    try {

        const claims = await CLAIMS.find().sort({ _id: -1 });
        console.log(claims)
        return res.status(200).send(claims);


    }
    catch (err) {
        // console.log(err);
        return res.status(500).send({ error: "cannot get user details" });
    }
})

route.post("/claim", async (req, res) => {
    console.log('assasa')
    const { name, phoneNo, color, brand, itemDescription, placeLost, email, catagory, subCatagory } = req.body
    const claimData = new CLAIMS({
        name: name,
        brandName: brand,
        phoneNo, phoneNo,
        color: color,
        itemDescription: itemDescription,
        placeLost: placeLost,
        email: email,
        catagory: catagory,
        subCatagory: subCatagory
    })
    console.log(claimData)
    const response = await claimData.save();
    res.status(200).send(response)
})


route.post("/item", verifyToken, async (req, res) => {
    try {
        // console.log(req.headers.authorization)
        const { reportingPersonName, brand, reportersPhoneNumber, placeOfLost, catagory, subCatagory } = req.body
        const itemData = new ITEM({ reportingPersonName, brand, reportersPhoneNumber, placeOfLost, catagory, subCatagory });
        console.log(itemData)
        const response = await itemData.save();
        res.status(200).send(response)
    }
    catch (err) {
        console.log(err);
    }

})


route.get('/deleteClaim', async (req, res) => {
    const { _id } = req.query;
    console.log(_id)
    const response = await CLAIMS.deleteOne({ _id: _id })
    res.status(200).send(response)
})

route.get('/deleteItem', verifyToken, async (req, res) => {
    console.log("asdasdas")
    const { _id } = req.query;
    console.log(_id)
    const response = await ITEM.deleteOne({ _id: _id })
    res.status(200).send(response)
})



route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    const response = await USER.findOne({ email: email })

    if (response) {

        const passwordError = await bcryt.compare(password, response.password);
        console.log(passwordError)
        if (passwordError) {
            const payload = {
                email: email,
            }
            const accessToken = JWT.sign(payload, 'SECRET_KEY', { expiresIn: '2h' })
            res.status(200).json({
                accessToken: accessToken,
                payload: payload
            })
        }
        else {
            res.status(402).send('Wrong Password!!')

        }
    }
    else {
        res.status(402).send('Email not registered!!')
    }
})

route.post('/signUp', async (req, res) => {
    const { email, username, password } = req.body;
    console.log(req.body)
    try {
        console.log("asd")
        const hashedPassword = await bcryt.hash(password, 10)
        console.log(hashedPassword)
        const newAdminData = new USER({
            username: username,
            password: hashedPassword,
            email: email
        })
        const response = await newAdminData.save();
        console.log(response)
        if (response)
            res.status(200).send("User Created")
        else
            res.status(404).send("Some error occurred while creating user")
    }
    catch (er) {
        res.status(404).send("SOME ERROR OCCURRED")
    }
})


module.exports = route;