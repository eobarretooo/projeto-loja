# Frontend - Assistência Técnica e Vendas

## Visão Geral

Este é o frontend de um sistema para assistência técnica e vendas, desenvolvido com React, Vite, TypeScript, shadcn-ui e Tailwind CSS. Ele se comunica com o backend para gerenciamento de clientes, ordens de serviço, estoque e pagamentos.

## Pré-requisitos
- Node.js (v18 ou superior recomendado)
- npm (v9 ou superior)

## Instalação e Uso

1. Clone o repositório:
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   ```
2. Acesse a pasta do frontend:
   ```bash
   cd frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie um arquivo `.env` com as variáveis necessárias (se houver um exemplo, copie de `.env.example`).
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
6. Acesse o sistema em [http://localhost:5173](http://localhost:5173) (ou a porta informada no terminal).

## Scripts Úteis
- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera a versão de produção
- `npm run preview` — executa o build localmente para testes

## Estrutura de Pastas
```
frontend/
  src/
    components/
    pages/
    App.tsx
    main.tsx
  public/
  README.md
```

## Tecnologias Utilizadas
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn-ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Integração com o Backend
Certifique-se de que o backend esteja rodando e que as URLs das APIs estejam corretamente configuradas nas variáveis de ambiente do frontend.

## Contribuição
Pull requests são bem-vindos! Abra uma issue para discutir mudanças antes de contribuir.

## Licença
Este projeto é open-source sob a licença MIT.

