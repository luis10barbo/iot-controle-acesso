package com.acesso.dao;


import com.acesso.model.Acesso;
import com.acesso.util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class AcessoDAO {
    private DatabaseConnection dbConnection;

    public AcessoDAO() {
        dbConnection = new DatabaseConnection();
    }

    public void insertAcesso(Acesso acesso) throws SQLException {
        String sql = "INSERT INTO acesso (id_cartao, id_porta, data_interacao, liberado) VALUES (?, ?, ?, ?)";

        try (Connection connection = dbConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, acesso.getIdCartao());
            statement.setString(2, acesso.getIdPorta());
            statement.setString(3, acesso.getDataInteracao());
            statement.setBoolean(4, acesso.isLiberado());
            statement.executeUpdate();
        }
    }
}

