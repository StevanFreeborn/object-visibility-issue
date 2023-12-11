import { Page, test as base } from '@playwright/test';
import { sysAdminAuth } from './playwright.config';

type TestFixtures = {
  sysAdmin: Page;
};

export const test = base.extend<TestFixtures>({
  sysAdmin: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: sysAdminAuth.storagePath,
    });
    const page = await context.newPage();
    await use(page);
    await page.close();
    await context.close();
  },
});
