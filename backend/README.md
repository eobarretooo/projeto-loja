# Backend - Assistência Técnica e Vendas

## Instalação

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie o arquivo `.env.example` para `.env` e preencha as variáveis.
3. Inicie o servidor:
   ```bash
   npm start
   ```

## Funcionalidades
- Autenticação JWT (login/cadastro, hash de senha)
- Gerenciamento de clientes, ordens de serviço, estoque e pagamentos
- Proteção de rotas e roles (admin/cliente)
- Segurança: CORS, rate limiting, sanitização
- API RESTful pronta para integração com React/Next.js

## Estrutura de Pastas
```
backend/
  src/
    controllers/
    middlewares/
    models/
    routes/
    utils/
    app.js
    server.js
```

## Endpoints principais
- `/api/user` - cadastro, login, perfil
- `/api/client` - CRUD de clientes
- `/api/repair` - CRUD de ordens de serviço
- `/api/stock` - CRUD de estoque
- `/api/payment` - pagamentos

## Segurança e Validação
- JWT, bcrypt, validação de dados, rate limiting, helmet, express-mongo-sanitize, CORS

---

## Observação
- Para pagamentos reais, configure a integração com Stripe, MercadoPago ou Pagar.me.
