const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./route/route")
require("dotenv").config()

const app = express();

app.use(cors())

app.use(bodyparser.json());


// -----++++-----=+=-------[ Connect to MongoDb ]-----=+=-----+++++------ //

mongoose.set('strictQuery', true)

mongoose.connect( process.env.CONNECTION_URL ,
    { useNewUrlParser: true }
).then(() => console.log("Connected to MongoDb..."))
    .catch((err) => console.log(err));


app.use("/", route)


// -----++++-----=+=-------[ Connect to PORT ]-----=+=-----+++++------ //

app.listen(process.env.PORT, function () {
    console.log("Express runnig on PORT : " + process.env.PORT)
})

// -----++++-----=+=-------****************-----=+=-----+++++------ //