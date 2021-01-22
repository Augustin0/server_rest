const on = require("./imagenes");
const { tokenIsValid } = require("../middlewars/middlewars").middlewars;
const { postProduct, getProduct, putProduct, deleteProduct } = require("../handlers/productHandlers");
on.post("/product", tokenIsValid, postProduct);
on.get("/product", tokenIsValid, getProduct);
on.put("/product", tokenIsValid, putProduct);
on.delete("/product", tokenIsValid, deleteProduct);
module.exports = on