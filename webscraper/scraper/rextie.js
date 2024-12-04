import { chromium } from "playwright";

export const scrapeRextie = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(process.env.REXTIE_URL);

    const container = await page.locator(".quote-container");
    container.waitFor();

    const extractPrice = async (selector) => {
      const element = page.locator(selector);
      await element.waitFor();

      const text = await element.textContent();
      return text?.match(/\d+(\.\d+)?/g)?.[0] ?? null;
    };

    const buyPrice = await extractPrice(".price.sell .amount");
    const sellPrice = await extractPrice(".price.sell .amount");

    if (!buyPrice || !sellPrice) {
      return {
        success: false,
        buy: 0,
        sell: 0,
        error: "Purchase/sale prices could not be extracted.",
      };
    }

    return {
      success: true,
      buy: parseFloat(buyPrice),
      sell: parseFloat(sellPrice),
    };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
};
