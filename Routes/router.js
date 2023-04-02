const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/usersControllers");
const auditControllers = require("../Controllers/auditControllers");
const upload = require("../multerconfig/storageConfig");

//routes

router.post("/product/register",upload.single("user_profile"),controllers.userpost);
router.get("/product/details", controllers.userget);
router.get("/product/:id", controllers.singleUserGet);
router.put("/product/edit/:id",upload.single("user_profile"),controllers.productedit);
router.delete("/product/delete/:id",controllers.productdelete);
router.put("/product/status/:id",controllers.productstatus);
router.get("/productsexport",controllers.productExport);
router.put("/product/quantity/:id",controllers.productquantity);

router.post("/audit/register",upload.single("user_profile"),auditControllers.auditpost);

router.get("/audit/details", auditControllers.auditget);



module.exports = router