const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "frequencydb",
});

app.use(express.json());
app.use(cors());

// Rota para criar um novo usuário
app.post("/Signin", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Erro ao consultar o banco de dados:", err);
            return res.status(500).send({ msg: "Erro ao consultar o banco de dados" });
        }

        if (result.length === 0) {
            // Geração do hash da senha antes de salvar no banco de dados
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.error("Erro ao gerar o hash da senha:", err);
                    return res.status(500).send({ msg: "Erro ao criar usuário" });
                }

                // Inserção do usuário com senha criptografada
                db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash], (err, result) => {
                    if (err) {
                        console.error("Erro ao inserir o usuário:", err);
                        return res.status(500).send({ msg: "Erro ao criar usuário" });
                    }
                    return res.status(201).send({ msg: "Cadastrado com sucesso" });
                });
            });
        } else {
            return res.status(409).send({ msg: "Usuário já cadastrado" });
        }
    });
});

// Rota de login
app.post("/Login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Erro ao consultar o banco de dados:", err);
            return res.status(500).send({ msg: "Erro ao consultar o banco de dados" });
        }

        if (result.length > 0) {
            // Comparar a senha fornecida com a senha armazenada no banco
            bcrypt.compare(password, result[0].password, (erro, isMatch) => {
                if (erro) {
                    console.error("Erro ao comparar senhas:", erro);
                    return res.status(500).send({ msg: "Erro ao comparar senhas" });
                }

                if (isMatch) {
                    return res.send({ msg: "Usuário logado" });

                } else {
                    return res.status(400).send({ msg: "Senha incorreta" });
                }
            });
        } else {
            return res.status(404).send({ msg: "E-mail não encontrado" });
        }
    });
});

app.listen(4000, () => {
    console.log("Rodando na porta 4000");
});
