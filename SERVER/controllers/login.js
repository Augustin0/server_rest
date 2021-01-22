const on = require("./productControler");
const { loginH } = require("../handlers/userLoginH").handlers;
on.get("/login", loginH);
module.exports = on