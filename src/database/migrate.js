require('dotenv').config();

const mysql = require('mysql2/promise');

async function migrate() {
    try {

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        console.log('Conectado ao MySQL.');

        await connection.query(`
            CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}
        `);

        console.log('Banco verificado.');

        await connection.query(`
            USE ${process.env.DB_NAME}
        `);

        // Tabela usuários
        await connection.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                senha VARCHAR(255) NOT NULL,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Tabela usuarios criada/verificada.');

        // Tabela disciplinas
        await connection.query(`
            CREATE TABLE IF NOT EXISTS disciplinas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                descricao TEXT
            )
        `);

        console.log('Tabela disciplinas criada/verificada.');

        // Tabela tarefas
        await connection.query(`
            CREATE TABLE IF NOT EXISTS tarefas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(150) NOT NULL,
                descricao TEXT,
                status ENUM(
                    'Pendente',
                    'Em andamento',
                    'Concluída'
                ) DEFAULT 'Pendente',
                data_entrega DATE,
                usuario_id INT NOT NULL,
                disciplina_id INT NOT NULL,

                FOREIGN KEY (usuario_id)
                    REFERENCES usuarios(id)
                    ON DELETE CASCADE,

                FOREIGN KEY (disciplina_id)
                    REFERENCES disciplinas(id)
                    ON DELETE CASCADE
            )
        `);

        console.log('Tabela tarefas criada/verificada.');

        await connection.end();

        console.log('Migração concluída com sucesso.');

    } catch (erro) {

        console.error('Erro na migração:', erro);

    }
}

migrate();