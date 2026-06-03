# CYARA LAR & ESTILO

Loja online (e-commerce) com backend NestJS e frontend React.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm (vem com o Node)

## Como rodar o projeto

Abra **dois terminais** (um para o backend, outro para o frontend).

### 1. Backend (API)

```bash
cd backend
npm install
npm run prisma:generate
npm run db:migrate
npm run start:dev
```

A API fica disponível em **http://localhost:3000**.

> **Fotos dos produtos:** todas as imagens `.jpeg` na pasta `backend/` são sincronizadas automaticamente ao iniciar o servidor. Também pode correr manualmente: `npm run sync:products`

> Se ainda não tiver o ficheiro `.env`, copie o exemplo:
> `copy .env.example .env` (Windows) ou `cp .env.example .env` (Mac/Linux).

### 2. Frontend (loja)

Num **segundo** terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra no browser o endereço que o Vite mostrar (normalmente **http://localhost:5173**).

## Ordem importante

1. Inicie primeiro o **backend**
2. Depois o **frontend**

Se o frontend abrir antes do backend, verá uma mensagem de erro até a API estar activa.

## Login admin

O login usa utilizadores na tabela `User` da base de dados SQLite (`backend/dev.db`).

Para criar um utilizador de teste (com Prisma Studio):

```bash
cd backend
npx prisma studio
```

Na tabela **User**, adicione um registo com `email`, `password` (texto por agora) e `role` (ex.: `admin`).

## Comandos úteis

| Comando | Onde | Descrição |
|---------|------|-----------|
| `npm run start:dev` | backend | API em modo desenvolvimento |
| `npm run dev` | frontend | Interface da loja |
| `npm run build` | backend / frontend | Compilar para produção |
| `npx prisma studio` | backend | Ver/editar base de dados |

## Estrutura

```
Loja/
├── backend/     # NestJS + Prisma + SQLite
└── frontend/    # React + Vite + Tailwind
```
