import { defineConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Configuration Playwright pour des tests API (aucun navigateur).
 * See https://playwright.dev/docs/api-testing
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Résultats dans le terminal + rapport HTML (sans ouverture automatique) */
  reporter: [['list'], ['html', { open: 'never' }]],
  /* Options partagées par tous les tests */
  use: {
    /* URL de l'API, surchargeable via la variable d'environnement BASE_URL */
    baseURL: process.env.BASE_URL ?? 'https://restful-booker.herokuapp.com',

    /* Headers envoyés avec chaque requête */
    extraHTTPHeaders: {
      Accept: 'application/json',
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Un seul projet : les tests API n'utilisent pas de navigateur */
  projects: [
    { name: 'api' },
  ],
});
