# Plataforma de Ideias - MVP

## Instalação
1. Clonar:
   `git clone <repo>`
2. Instalar dependências:
   `npm install`
3. Copiar .env.example -> .env e ajustar `MONGODB_URI` e `SESSION_SECRET`.
4. Rodar:
   `npm run dev` (nodemon) ou `npm start`

## Recursos implementados
- Autenticação com bcrypt + sessions.
- CRUD de ideias (apenas autor pode editar/remover).
- Voto único por usuário (índice único no schema Vote).
- Listagem ordenada por número de votos (aggregation).
- Proteções: helmet, csurf, express-async-errors, validação com express-validator.
- Views com Handlebars + flash messages.

## Notas
- Para produção, use HTTPS, cookie `secure`, e variável de sessão forte.