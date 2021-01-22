const on = require("express")();
const bodyParser = require('body-parser');
const upload = require('express-fileupload');

on.use(upload())
on.use(bodyParser.urlencoded({ extended: false }))
on.use(bodyParser.json())
module.exports = on