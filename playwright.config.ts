import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const BASE_URL = process.env.BASE_URL;
const username = process.env.SYS_ADMIN_USERNAME;
const password = process.env.SYS_ADMIN_PASSWORD;
const TARGET_APP_ID = process.env.TARGET_APP_ID;

if (!username) {
  throw new Error('SYS_ADMIN_USERNAME environment variable is not set.');
}

if (!password) {
  throw new Error('SYS_ADMIN_PASSWORD environment variable is not set.');
}

if (!BASE_URL) {
  throw new Error('BASE_URL environment variable is not set.');
}

if (!TARGET_APP_ID) {
  throw new Error('TARGET_APP_ID environment variable is not set.');
}

const sysAdminAuth = {
  username,
  password,
  storagePath: `.auth/${username}.json`,
};

const baseUrl = BASE_URL;
const targetAppId = parseInt(TARGET_APP_ID);

export { baseUrl, sysAdminAuth, targetAppId };

export default defineConfig({
  timeout: 1000 * 300,
  testDir: './.',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: undefined,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['blob']] : [['list'], ['html']],
  expect: {
    timeout: 1000 * 120,
  },
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    actionTimeout: 1000 * 120,
  },
  projects: [
    {
      name: 'setup',
      testMatch: '*.setup.ts',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
  ],
});
