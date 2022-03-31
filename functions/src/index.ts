import * as functions from "firebase-functions";
import * as playwright from "playwright-aws-lambda";

const query = "教育";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const procurement = functions.https.onRequest(
  async (request, response) => {
    // functions.logger.info("Hello logs!", { structuredData: true });
    // response.send("Hello from Firebase!");
    const browser = await playwright.launchChromium({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://www.p-portal.go.jp/pps-web-biz/UAA01/OAA0101", {
      waitUntil: "networkidle",
    });
    await page.locator("#case-name").type(`${query}`);
    await page.locator("#OAA0102").click();
    await page.locator("#tri_WAA0101FM01 > div.result-detail > table > tbody")
      .waitFor({
        state: "attached",
      });
    const titles = await page.locator(
      "div.result-detail > table > tbody > tr > td:nth-child(2)",
    )
      .evaluateAll(
        (tds) => tds.map((td) => td.textContent),
      );
    const ids = await page.locator(
      "div.result-detail > table > tbody > tr > td:nth-child(1)",
    )
      .evaluateAll(
        (tds) => tds.map((td) => td.textContent),
      );
    await browser.close();
    response.json([ids, titles]);
  },
);
