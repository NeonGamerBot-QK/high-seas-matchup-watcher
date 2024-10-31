import "dotenv/config";
import puppeteer from "puppeteer-extra";
import { WebClient } from "@slack/web-api";
import { PrismaClient } from "@prisma/client";
import { promisify } from "util";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
const wait = promisify(setTimeout);
const web = new WebClient(process.env.SLACK_TOKEN);
const db = new PrismaClient();

export interface Matchup {
  project1: Project1;
  project2: Project2;
  ts: number;
  signature: string;
}

export interface Project1 {
  id: string;
  identifier: string;
  readme_url: string;
  entrant: string[];
  repo_url: string;
  rating: number;
  title: string;
  deploy_url: string;
  screenshot_url: string;
  hours: number;
  contest: string[];
  entrant__slack_id: string[];
  project_source: string;
  ship_status: string;
  ship_type: string;
  created_time: string;
  record_id: string;
  ship_time: string;
  total_hours: number;
  credited_hours: number;
  ship_status_modified_at: string;
  doubloon_payout?: number;
  doubloon_payout_modified_at: string;
  "ship_status_modified_at copy": string;
  title_with_update_count: string;
}

export interface Project2 {
  id: string;
  identifier: string;
  readme_url: string;
  entrant: string[];
  repo_url: string;
  rating: number;
  title: string;
  deploy_url: string;
  screenshot_url: string;
  hours: number;
  contest: string[];
  doubloon_payout?: number;
  vote_requirement_met: boolean;
  entrant__slack_id: string[];
  project_source: string;
  ship_status: string;
  ship_type: string;
  created_time: string;
  record_id: string;
  ship_time: string;
  total_hours: number;
  credited_hours: number;
  ship_status_modified_at: string;
  doubloon_payout_modified_at: string;
  for_ysws: string;
  "ship_status_modified_at copy": string;
  paid_out: boolean;
  entrant__user_has_graduated: boolean[];
  title_with_update_count: string;
}
let cache: string[] = [];
puppeteer.use(StealthPlugin());
puppeteer
  .launch({
    headless: false,
    args: ["--no-sandbox"],
  })
  .then(async (browser) => {
    const page = await browser.pages().then((p) => p[0]);
    page.goto("https://highseas.hackclub.com/");
    // after login ...
    console.log(`Login to slack now..`);
    // await wait(500);
    await page.waitForNavigation();
    try {
      await page.evaluate(() => {
        //@ts-ignore
        document
          .getElementsByClassName(
            "bg-white text-black p-2 px-3 sm:px-6 w-fit rounded-lg text-base linkPop",
          )[0]
          .click();
      });
    } catch (e) {}
    await page.waitForNavigation();
    await wait(200);
    await page.type('[data-qa="signin_domain_input"]', "hackclub");
    await page.click('[aria-label="Continue"]');
    await page.waitForNavigation();
    await wait(200);
    await page.type('[data-qa="email_field"]', process.env.EMAIL!);
    await page.click('[aria-label="Sign In With Email"]');
    await page.waitForNavigation();
    await wait(200);
    console.log(`Enter the code from your email now.`);
    const code: string = await new Promise((r) =>
      process.stdin.once("data", (d) => r(d.toString().trim())),
    );
    for (let i = 0; i < code.length; i++) {
      try {
        await page.type(`[aria-label*="digit ${i + 1} of 6"]`, code[i]);
      } catch (e) {}
      await wait(10);
    }
    // 2s for redirect & 3s for allow being allowed
    await wait(5000);
    await page.click('[aria-label="Allow"]');
    await wait(4500);
    await page.goto("https://highseas.hackclub.com/api/battles/matchups");
    await wait(300);
    async function getMatchups() {
      await page.reload();
      const json: Matchup = await page.evaluate(() =>
        JSON.parse(document.body.innerText),
      );
      console.debug(json);
      let fp = 0;
      for (const project of [json.project1, json.project2]) {
        // if(cache.includes(project.id)) continue;
        // cache.push(project.id)
        if (await db.project.findFirst({ where: { hs_id: project.id } }))
          continue;
        fp++;
        await db.project.create({
          data: {
            hs_id: project.id,
            identifie: project.identifier,
            readme_url: project.readme_url,
            repo_url: project.repo_url,
            rating: project.rating,
            title: project.title,
            deploy_url: project.deploy_url,
            screenshot_url: project.screenshot_url,
            hours: project.hours,
            project_source: project.project_source,
            ship_status: project.ship_status,
            ship_type: project.ship_type,
            created_time: project.created_time,
            record_id: project.record_id,
            ship_time: project.ship_time,
            total_hours: project.total_hours,
            credited_hours: project.credited_hours,
            ship_status_modified_at: project.ship_status_modified_at,
          },
        });
        await web.chat.postMessage({
          blocks: [
            //todo: https://app.slack.com/block-kit-builder/T053NBD7RDG#%7B%22blocks%22:%5B%7B%22type%22:%22section%22,%22text%22:%7B%22type%22:%22mrkdwn%22,%22text%22:%22This%20is%20a%20section%20block%20with%20an%20accessory%20image.%22%7D,%22accessory%22:%7B%22type%22:%22image%22,%22image_url%22:%22https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg%22,%22alt_text%22:%22cute%20cat%22%7D%7D%5D%7D

            {
              type: "image",
              image_url: project.screenshot_url,
              alt_text: project.title,
            },
            {
              type: "header",
              text: {
                type: "plain_text",
                text: project.title,
                emoji: true,
              },
            },
            {
              type: "rich_text",
              elements: [
                {
                  type: "rich_text_section",
                  elements: [
                    {
                      type: "text",
                      text: `My Source is \`${project.project_source}\``,
                    },
                  ],
                },
              ],
            },
            {
              type: "rich_text",
              elements: [
                {
                  type: "rich_text_section",
                  elements: [
                    {
                      type: "text",
                      text: `Added by <@${project.entrant__slack_id.join(">, <@")}>`,
                    },
                  ],
                },
              ],
            },
            {
              type: "rich_text",
              elements: [
                {
                  type: "rich_text_section",
                  elements: [
                    {
                      type: "text",
                      text: `Created at *${new Date(project.created_time).toLocaleString()}* and shipped at*${new Date(project.ship_time).toLocaleString()}*`,
                    },
                  ],
                },
              ],
            },
            {
              type: "rich_text",
              elements: [
                {
                  type: "rich_text_section",
                  elements: [
                    {
                      type: "text",
                      text: `This project took ${project.hours.toFixed(2)} and earned \`${project.doubloon_payout}\` dabloons`,
                    },
                  ],
                },
              ],
            },
            {
              type: "actions",
              elements: [
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "See README",
                    emoji: true,
                  },
                  value: "click_me_123",
                  url: project.readme_url,
                  action_id: "actionId-0",
                },
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "See Repo",
                    emoji: true,
                  },
                  value: "click_me_123",
                  url: project.repo_url,
                  action_id: "actionId-1",
                },
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "See Demo URL",
                    emoji: true,
                  },
                  value: "click_me_123",
                  url: project.deploy_url,
                  action_id: "actionId-2",
                },
              ],
            },
          ],
          channel: process.env.SLACK_CHANNEL!,
        });
      }
      let timeout = 5 * 1000;
      if (fp == 1) timeout *= 2;
      if (fp == 0) timeout *= 60;
      console.log(`Waiting ${timeout / 1000} seconds for slack to post.`);
      await wait(timeout);
      getMatchups();
    }
    getMatchups();
  });
process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

process.on("unhandledRejection", console.error);
