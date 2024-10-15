package com.acesso.controller;


import com.acesso.dao.AcessoDAO;
import com.acesso.model.Acesso;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/acesso")
public class AccessServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private AcessoDAO acessoDAO;

    @Override
    public void init() throws ServletException {
        acessoDAO = new AcessoDAO();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String idCartao = request.getParameter("id_cartao");
        String idPorta = request.getParameter("id_porta");
        boolean liberado = false;

        Acesso acesso = new Acesso();
        acesso.setIdCartao(idCartao);
        acesso.setIdPorta(idPorta);
        acesso.setLiberado(liberado);
        acesso.setDataInteracao(java.time.LocalDateTime.now().toString());

        try {
            acessoDAO.insertAcesso(acesso);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().println("Acesso registrado com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().println("Erro ao registrar acesso.");
        }
    }
}



