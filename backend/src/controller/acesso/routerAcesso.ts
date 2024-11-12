import { Router } from "express";
import db from "../../utils/prisma";
import HttpStatusCode from "../../utils/httpStatusCodes";

const routerAcesso = Router();
routerAcesso.post("/confirmar", async (req, res) => {
    const idCartao = req.body.id_cartao;
    const idPorta = req.query["id_porta"];
    const dataInteracao = req.query["data_interacao"];
    console.log(idCartao)

    // validar se foram enviados as informacoes acima
    if (!idCartao || typeof idCartao != "string") {
        res.status(HttpStatusCode.BAD_REQUEST).send("id cartao nao definido.")
        return;
    }
    if (!idPorta || typeof idPorta != "string") {
        res.status(HttpStatusCode.BAD_REQUEST).send("id porta nao definido.")
        return;
    }

    // codigo de confirmar acesso aqui
    let confirmacaoAcesso = false;

    const cartao = await db.cartao.findUnique({ where: { id: idCartao } })
    if (!cartao) {
        // cartao nao existe, registrar
        const cartao = await db.cartao.create({ data: { id: idCartao } });
        res.status(HttpStatusCode.UNAUTHORIZED).send(confirmacaoAcesso);
        return;
    }

    const cartaoAutorizado = await db.cartao.findUnique({ where: { id: idCartao, PortasPermitidas: { some: { id: idPorta } } } })
    if (!cartaoAutorizado) {
        // se nao achar nenhum cartao com id idCartao e com PortaPermitida da idPorta passada
        res.status(HttpStatusCode.UNAUTHORIZED).send(confirmacaoAcesso);
        return;
    }
    confirmacaoAcesso = true;
    res.status(200).send(confirmacaoAcesso);
})

export default routerAcesso;