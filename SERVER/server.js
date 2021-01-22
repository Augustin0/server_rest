require("./config");
const { print, initDatabase } = require("./utils").utils;
let on = require("./controllers/login");
const PORT = process.env.PORT;
const host = process.env.dataBaseHost;

(() => {
    initDatabase(host);
    on.listen(PORT, () => {
        print(`Sirviendo en el puerto  ${PORT}`);
    });
})()