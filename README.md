# ISTIC UI - Design System

Bem-vindo ao nosso Design System ISTIC! Este repositório contém os componentes e diretrizes para ajudar você a construir interfaces de usuário consistentes e bonitas em seus projetos React.

### Índice

1. [Introdução](https://frontdesignsystem.azurewebsites.net/?path=/docs/stick-ui-Introdução--documentation)
2. [Primeiros Passos](https://frontdesignsystem.azurewebsites.net/?path=/docs/stick-ui-getting-started--documentation)

### Introdução

Nosso Design System fornece um conjunto de componentes reutilizáveis, estilos e diretrizes para manter a consistência e agilizar o desenvolvimento em diferentes projetos. Seja construindo um novo aplicativo ou integrando componentes em um já existente, este design system ajuda você a criar experiências de usuário encantadoras de forma eficiente.

### Primeiros Passos

Para começar a usar nosso design system, siga estas etapas:

1. **Instalação**: Instale o pacote do design system em seu projeto React usando npm ou yarn.

2. **Importar Componentes**: Importe os componentes necessários do pacote para seus componentes React.

3. **Comece a Usar**: Comece a usar os componentes dentro de sua aplicação, seguindo as diretrizes fornecidas para personalização e uso.

### Uso

Nosso design system inclui uma variedade de componentes que atendem a diferentes necessidades de UI. Cada componente vem com seu conjunto de props para personalização e é documentado para facilitar o uso.

## Contribuições

### Scripts Disponíveis

- `dev`: Executa o comando `turbo run dev --parallel` para rodar o projeto em modo de desenvolvimento.
- `build`: Executa o comando `turbo run build` para construir o projeto.
- `changeset`: Executa o comando `changeset` para gerenciar mudanças no projeto.
- `version-packages`: Executa o comando `changeset version` para versionar os pacotes.
- `release`: Executa o comando `turbo run build --filter=@istic-ui/docs && changeset publish` para construir e publicar os pacotes.

### Como Rodar o Projeto

1. **Instalar Dependências**

   Primeiro, instale as dependências do projeto. Certifique-se de que você tem o Node.js instalado na sua máquina.

   ```bash
   npm install
   ```

2. **Rodar em Modo de Desenvolvimento**

   Para iniciar o projeto em modo de desenvolvimento, utilize o seguinte comando:

   ```bash
   npm run dev
   ```

3. **Construir o Projeto**

   Para construir o projeto, utilize o seguinte comando:

   ```bash
   npm run build
   ```

4. **Gerenciar Mudanças**

   Para criar um changeset, utilize o comando:

   ```bash
   npm run changeset
   ```

   Para versionar os pacotes após criar um changeset:

   ```bash
   npm run version-packages
   ```

5. **Publicar Pacotes**

   Para construir e publicar os pacotes, utilize o comando:

   ```bash
   npm run release
   ```

### Ferramentas Utilizadas

- **Turbo**: Utilizado para execução de scripts em paralelo e gerenciamento de build.
- **Changesets**: Utilizado para gerenciar e versionar mudanças no projeto.
- **ESLint**: Utilizado para análise estática de código JavaScript/TypeScript.
- **Prettier**: Utilizado para formatação de código.
- **TailwindCSS**: Utilizado para estilização.
- **Rollup**: Utilizado para empacotamento de módulos JavaScript.

### Github Actions

Este projeto usa GitHub Actions para CI/CD. O workflow Deploy Docs é acionado em push para a branch main e realizada o deploy do Storybook e do pacote no NPM.

### Secrets

As secrets são variáveis sensíveis que são utilizadas no seu workflow do GitHub Actions para proteger informações confidenciais, como tokens de autenticação. No seu workflow, são utilizadas as seguintes secrets:

TURBO_TOKEN: Token utilizado pelo Turbo para autenticação.
TURBO_TEAM: Identificador do time no Turbo.
GITHUB_TOKEN: Token padrão do GitHub Actions para autenticação e autorização.
NPM_TOKEN: Token de autenticação para publicar pacotes no NPM.

### Onde Encontrar e Como Configurar as Secrets

Você pode configurar as secrets no GitHub da seguinte forma:

Nas configurações do projeto, em "Secrets and variables" -> "Actions"

TURBO_TOKEN: Deve ser criado um token na [Vercel](https://vercel.com/account/tokens).

TURBO_TEAM: Identificador do time na [Vercel](https://vercel.com/account/tokens).

NPM_TOKEN: Gere um token de autenticação no NPM. [NPM](https://www.npmjs.com/settings/[NPM-USERNAME]/tokens)

Para mais informações acesse [TurboRepo](https://turbo.build/repo/docs/guides/ci-vendors/github-actions)
