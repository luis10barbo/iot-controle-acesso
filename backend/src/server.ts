import express from "express";
import dotenv from "dotenv"
import routerAcesso from "./controller/acesso/routerAcesso";
dotenv.config();

const app = express();
const porta = process.env.PORTA ? process.env.PORTA : 8000;

app.use("/acesso", routerAcesso);
app.listen(porta, () => {
    console.log(`Servidor iniciado em porta ${porta}`);
});
