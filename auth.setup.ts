import { test as setup } from '@playwright/test';
import { SYS_ADMIN } from './playwright.config';

setup('login to instance', async ({ page }) => {
  await page.goto('/Public/Login');

  await page.getByPlaceholder('Username').fill(SYS_ADMIN.username);
  await page.getByPlaceholder('Password').fill(SYS_ADMIN.password);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('/Dashboard');

  await page.context().storageState({ path: SYS_ADMIN.storagePath });
  await page.close();
});
