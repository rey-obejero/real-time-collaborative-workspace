import { expect, test } from '@playwright/test';
import { waitUntilApiResponds } from './helpers/wait-for-api';

const uniqueEmail = () => `e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
const password = 'E2e-Passw0rd!';

test('sign up lands in the app and can create a workspace', async ({ page }) => {
  await waitUntilApiResponds(page);

  await page.goto('/authentication/sign-up');
  await page.getByPlaceholder('Enter your email').fill(uniqueEmail());
  await page.getByPlaceholder('Enter your password').fill(password);
  await page.getByRole('button', { name: 'Sign Up' }).click();

  await expect(page).toHaveURL('/');
  const switcher = page.getByRole('button', { name: /Select workspace/ });
  await expect(switcher).toBeVisible();

  await switcher.click();
  await page.getByRole('menuitem', { name: 'New Workspace' }).click();
  await page
    .getByPlaceholder('Enter the name for your workspace')
    .fill('E2E Workspace');
  await page.getByRole('button', { name: 'Create', exact: true }).click();

  await switcher.click();
  await expect(
    page.getByRole('menuitem', { name: /E2E Workspace/ }),
  ).toBeVisible();
});

test('a registered user can sign in', async ({ page }) => {
  await waitUntilApiResponds(page);

  const email = uniqueEmail();
  await page.goto('/authentication/sign-up');
  await page.getByPlaceholder('Enter your email').fill(email);
  await page.getByPlaceholder('Enter your password').fill(password);
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await expect(page).toHaveURL('/');

  await page.goto('/authentication/sign-in');
  await page.getByPlaceholder('Enter your email').fill(email);
  await page.getByPlaceholder('Enter your password').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL('/');
  await expect(
    page.getByRole('button', { name: /Select workspace/ }),
  ).toBeVisible();
});
