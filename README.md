# plataformaIdeias
Aplicação web para que colaboradores enviem, votem e acompanhem propostas inovadoras.

# 💡 Plataforma de Ideias - Inovação J&F ⚙️

Este é o repositório do MVP (Produto Mínimo Viável) da **Plataforma de Ideias**, um sistema desenvolvido para o Instituto J&F Tech. O objetivo é criar uma ferramenta robusta e segura para que os colaboradores possam enviar, gerenciar e votar em propostas de inovação.

## 🎯 Features Principais

* **Autenticação Robusta:** Sistema completo de cadastro, login e logout com gerenciamento de sessão e hashing de senhas.
* **Gestão de Ideias (CRUD):** Usuários autenticados podem criar, listar, ver detalhes, editar e remover suas próprias ideias.
* **Sistema de Votação:** Mecanismo de voto único por ideia, com ordenação das ideias mais votadas.
* **Segurança:** Implementação de variáveis de ambiente (`dotenv`), proteção de rotas (`isLoggedIn`, `isAuthor`), e blindagem de aplicação (`helmet`, `csurf`).

## 🛠️ Tecnologias Utilizadas (Tech Stack)

* **Backend:** Node.js, Express
* **Banco de Dados:** MongoDB com Mongoose (ODM)
* **Autenticação:** Express-session e Bcrypt
* **View Engine:** Handlebars
* **Segurança:** Helmet (proteção de headers), csurf (proteção CSRF)
* **Qualidade:** dotenv (variáveis de ambiente), express-async-errors (tratamento de erros)
* **UX:** express-flash (mensagens de feedback)

---

## 🚀 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente.

### 1. Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
* [MongoDB](https://www.mongodb.com/try/download/community) (servidor local ou um Atlas URI)

### 2. Clone o Repositório

```bash
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
cd plataforma-ideias
