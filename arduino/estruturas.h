#include <string.h>
// Request enviado ao backend para checar se pode acessar
typedef struct
{
    char *id_cartao;
    char *id_porta;

    char *data_interacao;
} RequestConfirmarAcesso;

// Resposta recebida pelo backend ao tentar acesso
typedef struct
{
    bool acesso_liberado;
} RespostaConfirmarAcesso;

// Banco de dados
/*
CREATE TABLE cartao (
    id_cartao TEXT PRIMARY KEY
);

CREATE TABLE porta (
    id_porta TEXT PRIMARY KEY
);

CREATE TABLE acesso (
    id_acesso INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cartao TEXT NOT NULL,
    id_porta TEXT NOT NULL,
    data_interacao TEXT,
    liberado BOOLEAN NOT NULL DEFAULT(false),

    FOREIGN KEY id_cartao REFERENCES cartao(id_cartao),
    FOREIGN KEY id_porta REFERENCES porta(id_porta)
);


CREATE TABLE cartao_porta (
    id_cartao_porta INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cartao TEXT NOT NULL,
    id_porta TEXT NOT NULL,

    FOREIGN KEY id_cartao REFERENCES cartao(id_cartao),
    FOREIGN KEY id_porta REFERENCES porta(id_porta)
);
*/