import { Router } from "express";
import db from "../../utils/prisma";
import HttpStatusCode from "../../utils/httpStatusCodes";

const routerCartao = Router();


routerCartao.post("/autorizacao", async (req, res) => {
    const {id_cartao, autorizacao} = req.body;
    if (!id_cartao || typeof id_cartao !== "string") {
        res.status(HttpStatusCode.BAD_REQUEST).send("ID do cartão é obrigatorio.");
        return
    }

    if (!autorizacao) {
        res.status(HttpStatusCode.BAD_REQUEST).send("Valor de autorizacao (booleano) e obrigatorio");
        return
    }

    let autorizacaoBool = false; 
    try {
        autorizacaoBool = JSON.parse(autorizacao);
        if (typeof autorizacaoBool !== "boolean") {
            throw(new Error("Valor de autorizacao nao e um booleano."))
        }
    } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST).send("Valor de autorizacao nao e um booleano.");
        return
    }
    const porta = await db.porta.findFirst();
    if (!porta) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send("Nao existe nenhuma porta no sistema.");
        return
    }
    if (autorizacaoBool === true) {
        db.cartao.update({
            data: {
                PortasPermitidas: {
                    connect: {
                        id: porta?.id,
                    }
                }
            }, 
            where: {
                id: id_cartao
            }
        })
    } else {
        db.cartao.update({
            data: {
                PortasPermitidas: {
                    disconnect: {
                        id: porta?.id,
                    }
                }
            }, 
            where: {
                id: id_cartao
            }
        })
    }
    
})

routerCartao.post("/criar", async (req, res) => {
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
