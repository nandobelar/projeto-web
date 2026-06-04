const connection = require('../database/connection');

class Disciplina {

    static async criar(nome, descricao) {
        const [result] = await connection.promise().query(
            'INSERT INTO disciplinas (nome, descricao) VALUES (?, ?)',
            [nome, descricao]
        );

        return result;
    }

    static async listar() {
        const [rows] = await connection.promise().query(
            'SELECT * FROM disciplinas'
        );

        return rows;
    }

    static async buscarPorId(id) {
        const [rows] = await connection.promise().query(
            'SELECT * FROM disciplinas WHERE id = ?',
            [id]
        );

        return rows[0];
    }
}

module.exports = Disciplina;