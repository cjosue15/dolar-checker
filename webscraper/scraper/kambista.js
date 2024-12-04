import { chromium } from "playwright";
const extractPrice = async (page, selector) => {
  const element = page.locator(selector);
  await element.waitFor();
  return (await element.textContent()) ?? null;
};

export const scrapeKambista = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(process.env.KAMBISTA_URL);

    const container = page.locator(".km_calc-encabezado");
    await container.waitFor();

    const buyPrice = await extractPrice(page, "#valcompra");
    const sellPrice = await extractPrice(page, "#valventa");

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
