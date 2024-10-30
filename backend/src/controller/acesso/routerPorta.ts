import { Router } from "express";
import db from "../../utils/prisma";

const routerPorta = Router();

routerPorta.post("/criar", async (req, res) => {
    const idPorta = req.query["id_porta"];
    const porta = await db.porta.create({data: { id: idPorta as string }});
    res.send(porta);
});

export default routerPorta;