# Spotify Challenge

Este projeto tem por objetivo utilizar a API pública do Spotify para listar artistas com funcionalidades de busca, filtros e exibição de detalhes.

## 🎯 Critérios de Aceite

### Funcionalidades Principais

- **Listagem de Artistas**: Página com paginação de 20 itens por página (sem usar tabela)
- **Filtros de Busca**: Filtro para buscar por nome do artista e por álbum
- **Página de Detalhes**: Ao clicar em um artista, redirecionar para página de detalhes contendo:
  - Informações do artista
  - Lista de top tracks ou álbuns do artista
  - Tabela paginada com músicas ou álbuns do artista
- **Internacionalização**: Tradução com idiomas em português e inglês
- **Gráficos**: Visualização de dados com gráficos
- **Favoritos**: Formulário para cadastrar músicas favoritas (salvando no localStorage ou cookies)

### 🌟 Diferenciais (Plus)

Será considerado plus se:
- A criatividade for explorada
- Adicionar novas imagens ou animações entre outros artifícios para dar sua assinatura à aplicação
- Validações de campos e mensagens de erros com feedback visual
- Adicionar mais funcionalidades seguindo a API do Spotify
- Adicionar filtros extras que façam sentido para as funcionalidades existentes

## 🛠️ Requisitos Técnicos Obrigatórios

### Core Technologies
- **React** - Biblioteca principal para UI
- **TypeScript** - Tipagem estática
- **Context API** - Gerenciamento de estado utilizando useReducer
- **React Query** - Cache e sincronização de dados
- **Axios** - Cliente HTTP para requisições
- **Tailwind CSS** - Framework CSS para estilização
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **i18n** - Internacionalização

### 🔧 Diferenciais Técnicos
- Testes unitários e end-to-end
- ESLint e Prettier para padronização de código
- Validações usando Zod

## 🚀 Como Executar

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

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Adicione sua chave da API do Spotify no arquivo `.env`:
```
REACT_APP_SPOTIFY_CLIENT_ID=seu_client_id_aqui
REACT_APP_SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
```

5. Execute o projeto:
```bash
npm start
# ou
yarn start
```

O projeto estará disponível em `http://localhost:3000`

### Testes

Para executar os testes:
```bash
# Testes unitários
npm test
# ou
yarn test

# Testes end-to-end
npm run test:e2e
# ou
yarn test:e2e
```

### Build para Produção

```bash
npm run build
# ou
yarn build
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── pages/              # Páginas da aplicação
├── hooks/              # Custom hooks
├── contexts/           # Context API providers
├── services/           # Serviços de API
├── types/              # Definições de tipos TypeScript
├── utils/              # Funções utilitárias
├── locales/            # Arquivos de tradução
└── styles/             # Estilos globais
```

## 🌐 API do Spotify

Este projeto utiliza a [Spotify Web API](https://developer.spotify.com/documentation/web-api/) para:
- Buscar artistas
- Obter detalhes de artistas
- Listar álbuns e tracks
- Buscar dados de popularidade

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
