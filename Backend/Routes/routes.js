const router = require("express").Router()
const {login, register, GetAllUser} = require("../Controller/controller");
 
router.post("/login", login);
router.post("/register", register);
router.get("/",GetAllUser)

module.exports = router;