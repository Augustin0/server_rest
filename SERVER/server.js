require("./config")
const { getUser, deleteUser, postUser, putUser } = require("./handlers").handlers;
const { print } = require("./utils").utils;
const on = require("express")();
const bodyParser = require('body-parser')
const PORT = process.env.PORT
on.use(bodyParser.urlencoded({ extended: false }))
on.use(bodyParser.json())
on.post("/usuario", postUser)
on.get("/usuario/:id", getUser);
on.put("/usuario", putUser)
on.delete("/usuario", deleteUser)
on.listen(PORT, () => {
    print(`Sirviendo en el puerto  ${PORT}`)
})