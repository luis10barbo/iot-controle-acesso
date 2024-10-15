package com.acesso.dao;

import com.acesso.util.DatabaseConnection;
import com.acesso.model.Porta;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class PortaDAO {
    private DatabaseConnection dbConnection;

    public PortaDAO() {
        dbConnection = new DatabaseConnection();
    }

    public void insertPorta(Porta porta) throws SQLException {
        String sql = "INSERT INTO porta (id_porta) VALUES (?)";

        try (Connection connection = dbConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, porta.getIdPorta());
            statement.executeUpdate();
        }
    }
}


