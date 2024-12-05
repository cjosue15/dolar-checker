import { firefox } from "playwright";

export const scrapeSunat = async () => {
  const browser = await firefox.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(process.env.SUNAT_URL);

    const calendar = page.locator(".calendar-table");
    await calendar.waitFor({ timeout: 30000 });

    const extractPrice = async (selector) => {
      const element = page.locator(selector).last();
      await element.waitFor();
      const text = await element.textContent();
      return text?.match(/\d+(\.\d+)?/g)?.[0] ?? null;
    };

    const buyPrice = await extractPrice(".event.normal-all-day");
    const sellPrice = await extractPrice(".event.pap-all-day");

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
    return {
      success: false,
      buy: 0,
      sell: 0,
      error: error.message,
    };
  } finally {
    await browser.close();
  }
};
