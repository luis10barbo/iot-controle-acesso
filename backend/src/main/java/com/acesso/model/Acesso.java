package com.acesso.model;


public class Acesso {
    private String idCartao;

    private String idPorta;

    private String dataInteracao;

    private boolean liberado;


    public String getIdCartao() {
        return idCartao;
    }
    public void setIdCartao(String idCartao) {
        this.idCartao = idCartao;
    }
    public String getIdPorta() {
        return idPorta;
    }
    public void setIdPorta(String idPorta) {
        this.idPorta = idPorta;
    }
    public String getDataInteracao() {
        return dataInteracao;
    }
    public void setDataInteracao(String dataInteracao) {
        this.dataInteracao = dataInteracao;
    }
    public boolean isLiberado() {
        return liberado;
    }
    public void setLiberado(boolean liberado) {
        this.liberado = liberado;
    }
}

