import { Router } from "express";
import db from "../../utils/prisma";
import HttpStatusCode from "../../utils/httpStatusCodes";

const routerCartao = Router();


routerCartao.post("/cartao", async (req, res) => {
    const { id } = req.body; 


    if (!id || typeof id !== "string") {
        res.status(HttpStatusCode.BAD_REQUEST).send("ID do cartão é obrigatorio.");
        return;
    }

    try {
        const novoCartao = await db.cartao.create({
            data: { id }, 
        });
        res.status(HttpStatusCode.CREATED).json(novoCartao);
    } catch (error) {
        console.error("Erro ao criar cartão:", error);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send("Erro ao criar cartão.");
    }
});

export default routerCartao;
