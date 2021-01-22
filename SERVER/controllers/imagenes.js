const path = require("path");
const on = require("./userController")
const { existsSync } = require("fs")

on.get("/imagen/:tipo/:imagen", (req, res) => {
    let tipo = req.params.tipo,
        imagen = req.params.imagen,
        notFoundImage = path.resolve(__dirname, './assets/not-found.jpg'),
        imageUrl = path.resolve(__dirname, `../../upload/${tipo}/${imagen}`);
    if (existsSync(imageUrl)) {
        res.sendFile(imageUrl);

        return
    }
    res.sendFile(notFoundImage);



});

module.exports = on