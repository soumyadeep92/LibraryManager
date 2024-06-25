const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const masterRoute = require('./src/routes/quizMasterRouter');
require('dotenv').config()
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

require('./src/config/mogooseConnector');

app.use("/server", (req, res) => {
    res.end("<h1 style='text-align:center;color:white;background-color:red'>Welcome to my library server </h1>")
})

const masterNodeApi = process.env.masterNodeApi;

app.use(masterNodeApi, masterRoute);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
    console.log("App running in port", PORT);
})