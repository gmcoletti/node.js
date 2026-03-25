# Monorepo Fullstack (Frontend + Backend)

Este repositório é um **monorepo** usando **npm workspaces** com 3 pacotes:

- `frontend`: React + TypeScript + Vite + Tailwind + React Router
- `backend`: Express + TypeScript
- `packages/validation`: validações compartilhadas com Zod (usadas no frontend e backend)

## 1. Pré-requisitos

Antes de começar, instale:

- **Node.js** (recomendado: versão LTS atual)
- **npm** (já vem com Node.js)
- **Git**

Para confirmar:

```bash
node -v
npm -v
git --version
```

## 2. Clonando e instalando o projeto

```bash
git clone <url-do-repositorio>
cd node.js
npm install
```

Esse `npm install` na raiz instala as dependências de todos os workspaces.

## 3. Variáveis de ambiente

Existe um arquivo de exemplo:

- `.env.example`

Crie seu `.env` local (se ainda não existir):

```bash
cp .env.example .env
```

Conteúdo atual esperado:

```env
PORT=3001
LOG_LEVEL=info
```

## 4. Como rodar em desenvolvimento

Importante: rode frontend e backend em **terminais separados**.

### Terminal 1 (backend)

```bash
npm run dev:backend
```

### Terminal 2 (frontend)

```bash
npm run dev:frontend
```

Depois acesse no navegador:

- Frontend: URL exibida pelo Vite (normalmente `http://localhost:5173`)
- Backend: `http://localhost:3001`

## 5. Rotas principais

### Frontend

- `/` -> página inicial
- `/hello-world` -> página que busca mensagem do backend
- `/user-form` -> formulário com validação compartilhada
- `*` -> página 404

### Backend (prefixo `/api`)

- `GET /api/home`
- `GET /api/hello`
- `POST /api/user-form`

## 6. Comandos mais usados

### Desenvolvimento

- `npm run dev` -> apenas mostra instrução para abrir 2 terminais
- `npm run dev:frontend` -> inicia frontend
- `npm run dev:backend` -> inicia backend

### Build

- `npm run build` -> build frontend + backend
- `npm run build:frontend`
- `npm run build:backend`
- `npm run build:validation`

### Qualidade

- `npm run lint` -> lint geral
- `npm run typecheck` -> checagem de tipos geral
- `npm run format` -> formata com Prettier
- `npm run format:check` -> valida formatação sem alterar arquivos

## 7. Validação compartilhada (Zod)

O schema está em:

- `packages/validation/src/index.ts`

Ele valida os campos do formulário:

- `email`
- `name`
- `dateOfBirth`

Essa validação é usada nos dois lados:

- frontend (antes de enviar)
- backend (garantia final no servidor)

## 8. Git hooks (Husky + lint-staged)

Este projeto usa pre-commit.

Ao fazer `git commit`, ele executa:

1. `lint-staged` (somente nos arquivos staged)
2. `npm run typecheck`
3. `npm run build`

Se algo falhar, o commit é bloqueado até corrigir.

## 9. Estrutura de pastas

```text
.
├── backend/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── routes/
│       ├── middlewares/
│       ├── errors/
│       └── lib/
├── frontend/
│   └── src/
│       ├── api/
│       ├── pages/
│       ├── components/
│       └── layouts/
├── packages/
│   └── validation/
└── package.json
```

## 10. Problemas comuns

### 1) "Alterei o backend e nada mudou"

- Confirme se o backend está rodando com `npm run dev:backend`
- Teste direto no backend: `http://localhost:3001/api/hello`

### 2) "Erro de lint com tsconfigRootDir"

- Já está configurado no monorepo
- Tente reiniciar o VS Code/ESLint server

### 3) "Mudei algo em `packages/validation` e não refletiu"

Rode:

```bash
npm run build:validation
```

E reinicie o frontend/backend se necessário.

## 11. Fluxo recomendado para começar rápido

1. `npm install`
2. `cp .env.example .env`
3. Terminal A: `npm run dev:backend`
4. Terminal B: `npm run dev:frontend`
5. Abrir frontend no navegador
6. Testar `/user-form`
