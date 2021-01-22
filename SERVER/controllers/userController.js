const { getUser, deleteUser, postUser, putUser, uploadFile } = require("../handlers/userHandlers").handlers;
const { subirIMG } = require("../handlers/productHandlers");
const { tokenIsValid } = require("../middlewars/middlewars").middlewars;
const on = require("../initApp")

on.put("/:tipo/:id", (req, res) => {
    if (req.params.tipo == "usuario") {
        uploadFile(req, res)
        return
    }
    subirIMG(req, res)
});
on.post("/usuario", tokenIsValid, postUser)
on.get("/usuario", tokenIsValid, getUser);
on.put("/usuario/:id", tokenIsValid, putUser)
on.delete("/usuario/:id", tokenIsValid, deleteUser)
module.exports = on