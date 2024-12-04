export const extractPrice = async (page, selector) => {
  const element = page.locator(selector).last();
  await element.waitFor();
  const text = await element.textContent();
  return text?.match(/\d+(\.\d+)?/g)?.[0] ?? null;
};
