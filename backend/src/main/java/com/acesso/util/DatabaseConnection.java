package com.acesso.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private final String jdbcURL = "jdbc:sqlite:acesso.db";
    private static Connection connection;

    private Connection connect() throws SQLException {
        connection = DriverManager.getConnection(jdbcURL);
        return connection;
    }

    public Connection getConnection() throws SQLException {
        if (connection == null) {
            return connect();
        }
        return connection;
    }
}

