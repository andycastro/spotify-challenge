# Spotify Challenge

Este projeto tem por objetivo utilizar a API pública do Spotify para listar artistas com funcionalidades de busca, filtros e exibição de detalhes.

> Documentação original de critérios e requisitos foi removida para focar apenas no estado atual da aplicação e sua arquitetura.

## 🚀 Como Executar

### Credenciais do Spotify

As chaves necessárias (Client ID e Client Secret) para executar este projeto estão disponíveis neste URL seguro (Bitwarden Send):

URL: https://send.bitwarden.com/#8NzhlvQnDECVLbOSADLqLA/pqCexzz2kg0VxHXrbBbnIQ  
Senha: nome da empresa solicitante do teste

Copie os valores e configure seu arquivo `.env` conforme indicado abaixo. Nunca faça commit de credenciais reais no repositório.

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Chave da API do Spotify

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/andycastro/spotify-challenge.git
cd spotify-challenge
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Crie o arquivo `.env` na raiz (se não existir) e adicione:

```
VITE_SPOTIFY_CLIENT_ID=seu_client_id_aqui
VITE_SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
```

> Estes nomes seguem o padrão Vite (`VITE_`).

4. Execute o projeto em modo desenvolvimento:

```bash
npm start
# ou
yarn start
```

O projeto estará disponível em `http://localhost:5173` (porta padrão do Vite).

### Testes

Este projeto utiliza **Vitest** + **Testing Library** para testes unitários de componentes e lógica.

```bash
# Executar todos os testes uma vez
npm run test

# Modo watch interativo
npm run test:watch
```

> Testes de E2E não estão configurados neste momento. Poderiam ser adicionados com Playwright ou Cypress como próximo passo.

### Build para Produção

```bash
npm run build
```

Os artefatos serão gerados na pasta `dist/`.

## 🌍 Demo em Produção

A aplicação está publicada na Vercel e pode ser acessada em:

https://spotify-challenge-ivory.vercel.app/

> Observação: Tokens de autenticação do Spotify expiram e são renovados automaticamente no fluxo implementado. Caso encontre erro de acesso, recarregue a página para forçar a solicitação de um novo token.

## 📁 Estrutura do Projeto

```
src/
├── api/                 # Configs axios, query client, services Spotify e tipos
│   ├── configs/         # Configurações (axiosInstanceConfig, queryClientConfig)
│   ├── contexts/        # AuthContext (token Spotify)
│   ├── hooks/           # Hooks relacionados à API (ex: useAuth)
│   ├── queries/         # Abstrações React Query (custom hooks de busca)
│   ├── services/        # spotifyAuthService / spotifyService
│   ├── types/           # Tipos derivados da API do Spotify
│   └── useCases/        # Casos de uso (ex: searchArtistsUseCase)
├── assets/              # Imagens, logos, SVGs
├── components/          # Componentes UI (cards, header, mode toggle, drawer, ui/ primitives)
│   └── ui/              # Componentes estilizados reutilizáveis (button, input, menu, pagination,...)
├── hooks/               # Hooks genéricos (ex: use-theme)
├── lib/                 # Utilidades de baixo nível (theme provider, utils globais)
├── pages/               # Páginas (Home, futuras rotas)
├── validation/          # Schemas Zod e helpers de armazenamento local
├── utils/               # Formatadores, helpers PWA/service worker
├── App.tsx              # Raiz da aplicação / layout principal
├── main.tsx             # Bootstrap React + Providers
└── i18n (via locales)   # Traduções PT/EN (locales/) - se aplicável

Outros arquivos raiz:
- vite.config.ts         # Configuração Vite + PWA + test
- tailwind.config.js     # Config Tailwind
- tsconfig*.json         # Configurações TypeScript (app / node)
- eslint.config.js       # Lint config
- public/                # Manifest, ícones PWA
```

## ✨ Funcionalidades Implementadas

| Categoria           | Funcionalidade                                       | Detalhes                                                                                |
| ------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Tema                | Tema dark por padrão com toggle para light           | Implementado via `ThemeProvider` + classes Tailwind (light-first + `dark:` overrides)   |
| Busca               | Busca de artistas com paginação                      | Paginação controlada, índices exibidos; mínimo de caracteres antes da busca             |
| Detalhes            | Página de detalhes do artista                        | Info geral, lista de álbuns paginada, carregamento com skeletons                        |
| Visualização        | Gráfico (Area Chart) de faixas por ano de lançamento | Usando **Recharts**, exibido acima da tabela de álbuns                                  |
| Persistência Local  | Salvar álbum (drawer)                                | Formulário com validação Zod; salva/atualiza entrada no `localStorage` (`saved.albums`) |
| Validação           | Zod schemas                                          | Form (`savedAlbumSchema`) e storage (`savedAlbumEntrySchema`, parsing seguro)           |
| Feedback            | Toasts de sucesso                                    | Biblioteca **sonner** para feedback ao salvar ou remover álbuns                         |
| Internacionalização | PT / EN                                              | Textos via `i18next`, chaves em `locales/`                                              |
| Estado / Dados      | React Query                                          | Cache de requisições Spotify e estado de loading/fetching                               |
| Autenticação        | Token Spotify                                        | Serviço `spotifyAuthService` gerencia token e armazenamento local                       |
| Skeletons           | Carregamento consistente                             | Cores adaptadas para light/dark com neutral-200 / neutral-800                           |
| PWA                 | Service Worker + Manifest                            | Configurado via `vite-plugin-pwa` (offline caching básico para API)                     |
| Acessibilidade      | Labels associados / aria                             | Ajustes nos inputs da drawer (`htmlFor`/`id`, `aria-invalid`)                           |
| Testes              | Unidade (Vitest + Testing Library)                   | Teste do fluxo de salvar e validação do formulário `SaveAlbumDrawer`                    |

## 🔒 Segurança e Boas Práticas

- Não commite credenciais reais; use `.env` ignorado pelo Git.
- Rotacione Client Secret se suspeitar de vazamento.
- Adicione verificação de expiração de token (já há suporte básico no serviço de auth).
- Para produção, considere proxy backend para ocultar Client Secret.

## 🛤 Próximos Passos Sugeridos

1. Testes E2E (Playwright/Cypress)
2. Zod para respostas da API (normalização contra mudanças do Spotify)
3. Filtro avançado por ano / tipo de álbum
4. Cache persistente com IndexedDB (ex. via `localforage` + React Query persist)
5. A11y pass com ferramenta (axe) e melhorias de foco/teclas
6. Modal de confirmação para remoção de álbum

## 🧪 Estratégia de Testes (Atual)

Os testes cobrem:

- Sucesso no salvamento de álbum (verifica toast/mock, `localStorage` e callback).
- Erro de validação quando nome vazio (mostra mensagem de erro via `data-testid`).

Possíveis ampliações:

- Testar remoção de álbum e atualização de estado na tabela.
- Mockar falha de rede (401 / 500) e garantir feedback de erro.
- Snapshot do gráfico para garantir formato dos dados.

```

## 🌐 API do Spotify

Este projeto utiliza a [Spotify Web API](https://developer.spotify.com/documentation/web-api/) para:

- Buscar artistas
- Obter detalhes de artistas
- Listar álbuns e tracks
- Buscar dados de popularidade

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
```
