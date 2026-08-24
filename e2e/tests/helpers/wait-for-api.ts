import { expect, type Page } from '@playwright/test';

export const waitUntilApiResponds = async (page: Page) => {
  await expect
    .poll(
      async () => {
        try {
          const response = await page.request.get('/api/v1/workspaces');
          return response.status();
        } catch {
          return 0;
        }
      },
      {
        timeout: 60_000,
        intervals: [2_000],
        message: 'API did not become reachable through the web proxy',
      },
    )
    .toBeLessThan(500);
};
