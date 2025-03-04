# Dynamic Go 1.0

## 📌 Visão Geral do Projeto

O Dynamic Go 1.0 é um projeto fullstack que implementa um sistema interativo de gerenciamento de usuários, postagens e comentários. Ele conta com uma API REST desenvolvida com Node.js e um frontend responsivo para visualização e interação com os dados.

## 🏗 Estrutura do Projeto

O projeto está organizado em:

- **Backend:** Node.js, Express e MongoDB.
- **Frontend:** React com Vite.
- **Autenticação:** Implementa JWT para segurança.
- **Banco de Dados:** MongoDB Atlas.

## 🚀 Como Rodar o Projeto Localmente

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/MvsHub/Dynamic-Go-1.0.git
cd Dynamic-Go-1.0
```

### 2️⃣ Configurar o Backend

```bash
cd backend
npm install
```

\*\*Crie um arquivo \*\*\`\` dentro da pasta `backend` com:

```
MONGO_URI=<SUA_STRING_DE_CONEXAO>
PORT=5000
JWT_SECRET=<SUA_CHAVE_SECRETA>
```

Para iniciar o backend:

```bash
npm run dev
```

### 3️⃣ Configurar o Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173/` para visualizar o frontend.

## 📦 Dependências Principais

- **Backend:** express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv
- **Frontend:** react, react-router-dom, axios

## 🔗 Links Úteis

- [Repositório no GitHub](https://github.com/MvsHub/Dynamic-Go-1.0)
- [Documentação da API (Swagger - Em breve)]

---

Se precisar de mais ajustes, é só falar! 🚀🔥

