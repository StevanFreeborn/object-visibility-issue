import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const BASE_URL = process.env.BASE_URL;
const username = process.env.SYS_ADMIN_USERNAME;
const password = process.env.SYS_ADMIN_PASSWORD;

if (!username) {
  throw new Error('SYS_ADMIN_USERNAME environment variable is not set.');
}

if (!password) {
  throw new Error('SYS_ADMIN_PASSWORD environment variable is not set.');
}

if (!BASE_URL) {
  throw new Error('BASE_URL environment variable is not set.');
}

export const SYS_ADMIN = {
  username,
  password,
  storagePath: `.auth/${username}.json`,
};

export default defineConfig({
  testDir: './.',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: undefined,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
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
