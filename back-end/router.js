import { Router } from "express";
import * as controller from "./controller.js";
import Auth from "./middleware/auth.js";

const router=Router();

router.route("/add").post(controller.addData);
router.route("/get").get(controller.getData);
router.route("/detail/:id").post(controller.detail);
router.route("/delete/:id").delete(controller.deleteTask);
router.route("/update/:id").patch(controller.updateTask);


router.route("/adduser").post(controller.addUser);
router.route("/login").post(controller.login);
router.route("/home").get(Auth, controller.home);

export default router;

