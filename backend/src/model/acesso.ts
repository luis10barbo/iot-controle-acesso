import db from "../utils/prisma";

export type Acessos = Awaited<ReturnType<typeof db.acesso.findMany>>
