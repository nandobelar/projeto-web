const connection = require('../database/connection');

class User {

    static async criar(nome, email, senha) {
        const [result] = await connection.promise().query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );

        return result;
    }

    static async listar() {
        const [rows] = await connection.promise().query(
            'SELECT * FROM usuarios'
        );

        return rows;
    }

    static async buscarPorId(id) {
        const [rows] = await connection.promise().query(
            'SELECT * FROM usuarios WHERE id = ?',
            [id]
        );

        return rows[0];
    }

    static async buscarPorEmail(email) {
        const [rows] = await connection.promise().query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        return rows[0];
    }
    
    static async deletar(id) {
    const [result] = await connection.promise().query(
        'DELETE FROM usuarios WHERE id = ?',
        [id]
    );

    return result;
    }
}

module.exports = User;