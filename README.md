# usabit-test-vue

Projeto para guardar as informações dos alunos para futuras utilizações.

### As tecnologias utilizadas foram

- Vite
- Vue3
- Vue Router
- Pinia
- Flowbite (UI components)
- Formkit
- Zod
- Tailwindcss
- Vitest
- Mswjs (mock de api)
- Eslint

## Instalação dos pacotes

```sh
pnpm install
```

### Compilação e Hot-Reload no modo desenvolvimento

```sh
pnpm dev
```

### Verificação de tipo, compilação e redução para produção

```sh
pnpm build
```

### Execute testes com [Vitest](https://vitest.dev/)

```sh
pnpm test
```

### Execute testes ponta a ponta com [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
pnpm build

# Runs the end-to-end tests
pnpm test:e2e
# Runs the tests only on Chromium
pnpm test:e2e --project=chromium
# Runs the tests of a specific file
pnpm test:e2e tests/example.spec.ts
# Runs the tests in debug mode
pnpm test:e2e --debug
```

### Lint com [ESLint](https://eslint.org/)

```sh
pnpm lint
```
