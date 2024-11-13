import { Router, static as static_ } from "express";

const routerApp = Router();

routerApp.use(static_("./"));

export default routerApp;