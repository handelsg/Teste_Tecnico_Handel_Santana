# 🚀 SpaceX Portal — Teste Técnico Frontend

Portal de lançamentos espaciais da SpaceX, construído com **Next.js 16**, **Tailwind CSS v4**, **Apollo Client** e **shadcn/ui**.

---

## ✨ Funcionalidades

- **Página Inicial (SSR)** — Hero com animação de estrelas, próximo lançamento em destaque e cards dos últimos 6 lançamentos
- **Catálogo de Lançamentos (CSR + Infinite Scroll)** — Lista paginada com carregamento progressivo via `IntersectionObserver`
- **Página de Detalhes (SSR)** — Nome da missão, descrição, foguete, galeria de imagens (Flickr), vídeo do YouTube embeddado e links externos
- **Design responsivo** — Mobile-first, totalmente adaptado para todos os breakpoints
- **Tema espacial dark** — Interface imersiva com gradientes, vidro fosco e animações suaves

---

## 🛠 Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| **Next.js 16** (App Router) | Framework principal |
| **TypeScript** | Tipagem estática |
| **Tailwind CSS v4** | Estilização utility-first |
| **shadcn/ui** | Componentes UI (Badge, Button, Card, Skeleton, Separator) |
| **@apollo/client** | Integração GraphQL |
| **GraphQL** | API pública da SpaceX |
| **Vitest + Testing Library** | Testes unitários |
| **Cypress** | Testes E2E |
| **Lucide React** | Ícones |

---

## 📁 Estrutura do Projeto

```
.
├── app/
│   ├── layout.tsx              # Layout raiz — Navbar, Footer, ApolloProvider
│   ├── page.tsx                # Home (SSR — force-dynamic)
│   ├── not-found.tsx           # Página 404 global
│   └── launches/
│       ├── page.tsx            # Catálogo (shell estático, dados via CSR)
│       └── [id]/
│           └── page.tsx        # Detalhes (SSR — force-dynamic)
├── components/
│   ├── ui/                     # Componentes shadcn/ui (Button, Badge, Card…)
│   ├── Navbar.tsx              # Navegação responsiva com menu mobile
│   ├── Footer.tsx              # Rodapé com links
│   ├── HeroSection.tsx         # Hero + próximo lançamento + recentes
│   ├── LaunchCard.tsx          # Card de lançamento
│   ├── LaunchCardSkeleton.tsx  # Skeleton loader do card
│   ├── LaunchCatalog.tsx       # Catálogo CSR com Infinite Scroll
│   └── StatusBadge.tsx         # Badge colorido de status
├── lib/
│   ├── apollo-client.ts        # Cliente Apollo para SSR (servidor)
│   ├── apollo-provider.tsx     # ApolloProvider para CSR (cliente)
│   ├── queries.ts              # Queries GraphQL (GET_LAUNCHES, GET_LAUNCH…)
│   └── utils.ts                # Utilitários: cn, formatDate, getLaunchStatus…
├── types/
│   └── launch.ts               # Interfaces TypeScript dos dados da API
├── __tests__/
│   ├── StatusBadge.test.tsx    # Testes unitários do StatusBadge
│   ├── LaunchCard.test.tsx     # Testes unitários do LaunchCard
│   └── utils.test.ts           # Testes unitários das funções utilitárias
└── cypress/
    ├── e2e/
    │   ├── home.cy.ts          # Testes E2E da página inicial
    │   ├── launches.cy.ts      # Testes E2E do catálogo + infinite scroll
    │   └── launch-detail.cy.ts # Testes E2E da página de detalhes
    └── support/
        ├── commands.ts         # Comandos customizados do Cypress
        └── e2e.ts              # Setup do Cypress
```

---

## 🔄 Estratégias de Renderização

### SSR (Server-Side Rendering)
- **Home** (`app/page.tsx`) — Os dados dos últimos lançamentos e do próximo voo são buscados no servidor via Apollo Client antes de enviar HTML ao cliente. Usa `export const dynamic = "force-dynamic"`.
- **Detalhes** (`app/launches/[id]/page.tsx`) — Os detalhes completos do lançamento são buscados no servidor. Inclui `generateMetadata` dinâmico para SEO.

### CSR (Client-Side Rendering)
- **Catálogo** (`components/LaunchCatalog.tsx`) — Componente `"use client"` que usa `useQuery` do Apollo. O `IntersectionObserver` observa um sentinel element no final da lista e aciona `fetchMore` para carregar mais páginas automaticamente (infinite scroll invisível).

---

## ⚡ Como Executar

### Pré-requisitos
- Node.js 18+
- npm

### Instalação

```bash
# Clone o repositório
git clone <url-do-repo>
cd <pasta>

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Build de Produção

```bash
npm run build
npm start
```

---

## 🧪 Testes

### Testes Unitários (Vitest + Testing Library)

```bash
# Executar todos os testes
npm test

# Modo watch (re-executa ao salvar)
npm run test:watch
```

**Cobertura dos testes unitários:**
- `StatusBadge` — 6 casos: todos os status (sucesso, falha, próximo, desconhecido), prioridade de `upcoming`
- `LaunchCard` — 8 casos: renderização de nome, foguete, status, local, link, detalhes, ausência de patch, missão futura
- `utils` — 12 casos: `formatDate`, `formatDateShort`, `getLaunchStatus`, `getYouTubeEmbedUrl`, `cn`

**Total: 26 testes passando ✅**

### Testes E2E (Cypress)

> **Importante:** O servidor deve estar rodando em `http://localhost:3000` antes de executar os testes E2E.

```bash
# Em um terminal, inicie o servidor
npm run dev
# ou
npm start

# Em outro terminal, execute os testes E2E
npm run test:e2e

# Ou abra a interface gráfica do Cypress
npm run test:e2e:open
```

**Cobertura dos testes E2E:**
- `home.cy.ts` — Título, seção de recentes, cards, navegação, navbar, footer
- `launches.cy.ts` — Título, grid, status badges, infinite scroll, navegação para detalhes
- `launch-detail.cy.ts` — Nome da missão, status, foguete, botão voltar, navegação, 404

---

## 🌐 API GraphQL

Este projeto consome a API pública da SpaceX disponível em:

```
https://spacex-production.up.railway.app/
```

**Queries utilizadas:**
- `launches(limit, offset, sort, order)` — Lista paginada de lançamentos
- `launch(id)` — Detalhes de um lançamento específico
- `launchNext` — Próximo lançamento agendado

---

## 📜 Licença

Projeto desenvolvido como teste técnico. Dados fornecidos pela API pública da SpaceX.
