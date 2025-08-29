from flask import Flask, render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__)

# Banco SQLite local
conn = sqlite3.connect('feedbacks.db', check_same_thread=False)
cursor = conn.cursor()

# Cria tabela se não existir
cursor.execute('''
CREATE TABLE IF NOT EXISTS feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    criado_em TEXT NOT NULL
)
''')
conn.commit()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/adicionar', methods=['POST'])
def adicionar_feedback():
    data = request.json
    cursor.execute('''
    INSERT INTO feedbacks (nome, email, mensagem, criado_em)
    VALUES (?, ?, ?, ?)
    ''', (data['nome'], data['email'], data['mensagem'], data['criado_em']))
    conn.commit()
    return jsonify({"status": "sucesso"})

@app.route('/feedbacks', methods=['GET'])
def listar_feedbacks():
    cursor.execute('SELECT * FROM feedbacks ORDER BY id DESC')
    rows = cursor.fetchall()
    feedbacks = [{"id": row[0], "nome": row[1], "email": row[2], "mensagem": row[3], "criado_em": row[4]} for row in rows]
    return jsonify(feedbacks)

@app.route('/excluir/<int:id>', methods=['DELETE'])
def excluir_feedback(id):
    cursor.execute('DELETE FROM feedbacks WHERE id=?', (id,))
    conn.commit()
    return jsonify({"status": "excluido"})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
