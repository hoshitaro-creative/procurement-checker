import { NextApiRequest, NextApiResponse } from "next";
import * as playwright from "playwright-aws-lambda";

const query = "教育";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
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
  res.status(200).json([ids, titles]);
};

export default handler;
