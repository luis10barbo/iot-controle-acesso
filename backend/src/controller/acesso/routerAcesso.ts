import { Router } from "express";

const routerAcesso = Router();
routerAcesso.get("/confirmar", (req, res) => {
    const idCartao = req.query["id_cartao"];
    const idPorta = req.query["id_porta"];
    const dataInteracao = req.query["data_interacao"];
    // colocar codigo de confirmar acesso aqui
    const confirmacaoAcesso = true;
    res.status(200).send(confirmacaoAcesso);
})

export default routerAcesso;