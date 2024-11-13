import { Router } from "express";
import db from "../../utils/prisma";
import HttpStatusCode from "../../utils/httpStatusCodes";
import { Acessos } from "../../model/acesso";

const routerAcesso = Router();
const conexoesAtivas = new Map<string, (acesso: Acessos[0]) => void>();
routerAcesso.get("/observar", async (_, res) => {
    // res.setHeader('Content-Type', 'text/event-stream');
    // res.setHeader('Cache-Control', 'no-cache');
    // res.setHeader('Connection', 'keep-alive');
    // res.flushHeaders();
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });

    // const id = createId();
    // conexoesAtivas.set(id, (acesso) => {
    //     res.write(`data: ${JSON.stringify(acesso)}`);
    // })

    // res.on("close", () => {
    //     conexoesAtivas.delete(id);
    //     res.end();
    // })
});
routerAcesso.post("/confirmar", async (req, res) => {
    const idCartao = req.body.id_cartao;

    // validar se foram enviados as informacoes acima
    if (!idCartao || typeof idCartao != "string") {
        res.status(HttpStatusCode.BAD_REQUEST).send("id cartao nao definido.")
        return;
    }
    const porta = await db.porta.findFirst();
    if (!porta) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send("Nao existe nenhuma porta no sistema.");
        return
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

    const cartaoAutorizado = await db.cartao.findUnique({ where: { id: idCartao, PortasPermitidas: { some: { id: porta.id } } } })
    if (!cartaoAutorizado) {
        // se nao achar nenhum cartao com id idCartao e com PortaPermitida da idPorta passada
        res.status(HttpStatusCode.UNAUTHORIZED).send(confirmacaoAcesso);
    } else { 
        confirmacaoAcesso = true;
        res.status(200).send(confirmacaoAcesso);
    }
   
    const acesso = await db.acesso.create({data: {liberado: confirmacaoAcesso, idCartao: idCartao, idPorta: porta.id}});
    conexoesAtivas.forEach(conexao => {
        conexao(acesso)
    })
    
})
routerAcesso.get("/listar", async (_, res) => {
    res.status(HttpStatusCode.OK).send(await db.acesso.findMany());
    
});

export default routerAcesso;