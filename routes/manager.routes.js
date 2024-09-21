// import express from "express"
import { Router } from "express";
import { manager } from "../controllers/manager.controller.js";
import { joi } from "../middlewares/joi.middleware.js";
import Joi from "joi";
const routes = Router();

const schema = Joi.object({
    companyName: Joi.string().alphanum().min(3).max(5).required(),
    managerName: Joi.string().alphanum().min(3).max(5).required(),
    manager_mo_no: Joi.number(),
    reference: Joi.string(),
    note: Joi.string()
})

routes.route("/addManager").post(joi(schema), manager.addManager)
routes.route("/getAllManager").get(manager.getAllManager)
routes.route("/getManager/:id").get(manager.getManager)
routes.route("/updateManager/:id").patch(manager.updateManager)
routes.route("/deleteManager/:id").delete(manager.deleteManager)




export default routes;