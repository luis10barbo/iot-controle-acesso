import express from "express";
import dotenv from "dotenv"
import routerAcesso from "./controller/acesso/routerAcesso";
import routerCartao from "./controller/acesso/routerCartao";
import db from "./utils/prisma";
import routerPorta from "./controller/acesso/routerPorta";
import routerApp from "./controller/acesso/routerApp";
import cors from "cors"

async function main() {
    dotenv.config();

    const app = express();
    const portaAberturaServidor = process.env.PORTA ? process.env.PORTA : 8000;


    app.use(cors({
        origin: "*",
        allowedHeaders: "Content-Type",
        
    }))

    app.use(express.urlencoded({ extended: true })); // support encoded bodies

    app.use("/porta", routerPorta);
    app.use("/cartao", routerCartao); //
    app.use("/acesso", routerAcesso);
    
    app.listen(portaAberturaServidor, async () => {
        console.log(`Servidor iniciado em porta ${portaAberturaServidor}`);

        // Criar apenas uma vez porta no banco de dados como demonstracao
        let porta = await db.porta.findFirst();
        if (!porta) {
            porta = await db.porta.create({ data: {} });
        }
        console.log(`Porta padrao criada ${JSON.stringify(porta)}`);

    });
}

// Executar a main e assim que ela acabar, fechar dp
main().then(
    () => {
        db.$disconnect();
    }
)