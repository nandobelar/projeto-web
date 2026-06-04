const connection = require('../database/connection');

class Tarefa {

    static async criar(
        titulo,
        descricao,
        data_entrega,
        usuario_id,
        disciplina_id
    ) {

        const [result] = await connection.promise().query(
            `INSERT INTO tarefas
            (titulo, descricao, data_entrega, usuario_id, disciplina_id)
            VALUES (?, ?, ?, ?, ?)`,
            [
                titulo,
                descricao,
                data_entrega,
                usuario_id,
                disciplina_id
            ]
        );

        return result;
    }

    static async listar() {
        const [rows] = await connection.promise().query(
            'SELECT * FROM tarefas'
        );

        return rows;
    }

    static async buscarPorId(id) {
        const [rows] = await connection.promise().query(
            'SELECT * FROM tarefas WHERE id = ?',
            [id]
        );

        return rows[0];
    }

    static async atualizarStatus(id, status) {
        const [result] = await connection.promise().query(
            'UPDATE tarefas SET status = ? WHERE id = ?',
            [status, id]
        );

        return result;
    }
}

module.exports = Tarefa;