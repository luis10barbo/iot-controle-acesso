package com.acesso.dao;

import com.acesso.model.Cartao;
import com.acesso.util.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CartaoDAO {
    private DatabaseConnection dbConnection;

    public CartaoDAO() {
        dbConnection = new DatabaseConnection();
    }

    public void insertCartao(Cartao cartao) throws SQLException {
        String sql = "INSERT INTO cartao (id_cartao) VALUES (?)";

        try (Connection connection = dbConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            if (cartao == null || cartao.getIdCartao()== null) {
                throw new IllegalArgumentException("Cartão ou ID do cartão não pode ser nulo");
            }
            statement.setString(1,cartao.getIdCartao());
            statement.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
        }
    }
}

