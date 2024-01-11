const express = require('express');
const app = express();
const routes = require('./Routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()

app.use(cors())

app.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes);

mongoose.connect('mongodb://127.0.0.1:27017/LOSTANDFOUND').then(() => {
    console.log(`DB CONNECTED!!!`)
}).catch(er => console.log(er))

app.listen(8000, () => console.log('LISTNING TO 8000!!!'))