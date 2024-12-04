import { firefox } from "playwright";

const extractPrice = async (page, selector) => {
  const element = page.locator(selector);
  await element.waitFor();
  const text = await element.textContent();
  return text ?? null;
};

export const scrapeTkambio = async () => {
  const browser = await firefox.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(process.env.TKAMBIO_URL);

    const container = await page.locator(".exchange-rates");
    container.waitFor();

    const buy = await extractPrice(
      page,
      ".exchange-rate.purcharse-content .price"
    );
    const sell = await extractPrice(page, ".exchange-rate.sale-content .price");

    if (!buy || !sell) {
      return {
        success: false,
        buy: 0,
        sell: 0,
        error: "Purchase/sale prices could not be extracted.",
      };
    }

    return {
      success: true,
      buy: parseFloat(buy),
      sell: parseFloat(sell),
    };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
};
