// import express from "express"
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
const routes = Router();
// const routes = express.Router();
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer";


routes.route("/registerUser").post(upload.single("profileImage"), registerUser.register)
routes.route("/deleteUser/:id").delete(registerUser.deleteUser)
routes.route("/getAllUser").get(registerUser.getUser)
routes.route("/updateUser/:id").patch(upload.single("profileImage"), registerUser.updateUser)



export default routes;