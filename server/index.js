const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { OAuth2Client } = require('google-auth-library');
const app = express();

// Configuração do banco de dados MySQL
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "frequencydb",
});

// Configuração do Google OAuth2 Client
const client = new OAuth2Client("4293781146-mbeoui56vjsnaebmss3dnjaket8n5miv.apps.googleusercontent.com"); // Substitua pelo seu Client ID do Google

// Middlewares
app.use(express.json());

// Configuração do CORS
app.use(cors({
    origin: "http://localhost:5173", // Substitua pelo seu domínio de frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true // Habilita o envio de cookies se necessário
}));

// Política de segurança COOP e CORS para evitar o bloqueio de comunicação entre janelas
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// Rota de login via Google
app.post("/GoogleLogin", async (req, res) => {
    const { credential } = req.body; // Certifique-se de que está recebendo "credential" no corpo da requisição

    if (!credential) {
        return res.status(400).send({ msg: "Credencial não fornecida" });
    }

    try {
        // Verifica o token e decodifica as informações do usuário
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: "4293781146-mbeoui56vjsnaebmss3dnjaket8n5miv.apps.googleusercontent.com", // O seu Client ID do Google
        });

        const payload = ticket.getPayload();
        const email = payload.email;
        const name = payload.name; // Nome do usuário (opcional)

        console.log("Payload do Google:", payload);

        // Verifica se o usuário já existe no banco de dados
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if (err) {
                console.error("Erro ao consultar o banco de dados:", err);
                return res.status(500).send({ msg: "Erro ao consultar o banco de dados" });
            }

            if (result.length === 0) {
                // Cria um novo usuário no banco (senha será uma string vazia, pois o login é via Google)
                db.query("INSERT INTO users (email, name, password) VALUES (?, ?, '')", [email, name], (err, result) => {
                    if (err) {
                        console.error("Erro ao inserir o usuário:", err);
                        return res.status(500).send({ msg: "Erro ao criar usuário" });
                    }
                    return res.status(201).send({ msg: "Usuário criado com sucesso via Google" });
                });
            } else {
                return res.status(200).send({ msg: "Login bem-sucedido via Google" });
            }
        });

    } catch (error) {
        console.error("Erro ao verificar token do Google:", error);
        return res.status(401).send({ msg: "Token inválido ou expirado" });
    }
});

// Rota de login via email e senha
app.post("/Login", (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if (err) {
            console.error("Erro ao consultar o banco de dados:", err);
            return res.status(500).send({ msg: "Erro ao consultar o banco de dados" });
        }
        if (result.length === 0) {
            return res.status(401).send({ msg: "Credenciais inválidas" });
        } else {
            return res.status(200).send({ msg: "Login bem-sucedido" });
        }
    });
});

// Inicia o servidor
app.listen(4000, () => {
    console.log("Servidor rodando na porta 4000");
});
