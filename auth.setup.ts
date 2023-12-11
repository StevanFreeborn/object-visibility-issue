import { test as setup } from '@playwright/test';
import { sysAdminAuth } from './playwright.config';

setup('login to instance', async ({ page }) => {
  await page.goto('/Public/Login');

  await page.getByPlaceholder('Username').fill(sysAdminAuth.username);
  await page.getByPlaceholder('Password').fill(sysAdminAuth.password);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('/Dashboard');

  await page.context().storageState({ path: sysAdminAuth.storagePath });
  await page.close();
});
