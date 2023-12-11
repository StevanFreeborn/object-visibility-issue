import { expect } from '@playwright/test';
import { test } from './fixtures';
import { targetAppId } from './playwright.config';

test('can create object visibility outcomes successfully', async ({
  sysAdmin,
}) => {
  const triggerName = `${Date.now()}_trigger`;
  const triggerFrame = sysAdmin
    .locator('div', {
      has: sysAdmin.getByText(/Triggers:/),
    })
    .frameLocator('iframe');
  const outcomeModal = sysAdmin.locator('div', {
    has: sysAdmin.getByText(/Outcome:/),
  });
  const section = outcomeModal.locator('.outcome-section').first();

  await test.step('navigate to app admin page', async () => {
    await sysAdmin.goto(`/Admin/App/${targetAppId}`);
  });

  await test.step('create trigger with object visibility outcome', async () => {
    await sysAdmin.locator('#tab-strip').getByText('Triggers').click();
    await sysAdmin.getByRole('link', { name: 'Add Trigger' }).click();
    await sysAdmin.locator('input[name="Name"]').fill(triggerName);
    await sysAdmin.getByRole('button', { name: 'Save' }).click();
    await sysAdmin.waitForLoadState('networkidle');

    await triggerFrame
      .locator('#dialog-tab-strip')
      .getByText('Outcomes')
      .click();

    await triggerFrame
      .locator('#outcome-grid')
      .getByRole('row', { name: 'Object Visibility' })
      .click();

    await sysAdmin.waitForLoadState('networkidle');

    await outcomeModal
      .locator('#dialog-tab-strip')
      .getByText('Display')
      .click();

    await section.hover();
    await section.locator('.display-mode').getByLabel('Hidden').click();

    await expect(section).toHaveClass(/outcome-type-1/);

    await outcomeModal.getByRole('button', { name: 'Ok' }).click();
    await sysAdmin.getByRole('button', { name: 'Save' }).click();
    await sysAdmin.waitForLoadState('networkidle');
  });

  await test.step("verify trigger's configured section is hidden", async () => {
    await sysAdmin.goto(`/Admin/App/${targetAppId}`);
    await sysAdmin
      .locator('#grid-triggers')
      .getByRole('row', { name: triggerName })
      .click();

    await sysAdmin.waitForLoadState('networkidle');

    await triggerFrame
      .locator('#dialog-tab-strip')
      .getByText('Outcomes')
      .click();

    await triggerFrame
      .locator('#outcome-grid')
      .getByRole('row', { name: 'Object Visibility' })
      .click();

    await sysAdmin.waitForLoadState('networkidle');

    await outcomeModal
      .locator('#dialog-tab-strip')
      .getByText('Display')
      .click();

    await expect(section).toHaveClass(/outcome-type-1/);
  });
});
