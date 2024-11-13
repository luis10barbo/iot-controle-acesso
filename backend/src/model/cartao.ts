import db from "../utils/prisma";

export async function adquirirCartoes() {
    return await db.cartao.findMany({include: {Acessos: true, PortasPermitidas: true}})
}

export type Cartoes = Awaited<ReturnType<typeof adquirirCartoes>>;