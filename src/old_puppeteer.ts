import 'dotenv/config'
import puppeteer  from 'puppeteer-extra';
import { promisify } from 'util'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
const wait = promisify(setTimeout)
puppeteer.use(StealthPlugin())
puppeteer.launch({ headless: false, args: ['--no-sandbox']  }).then(async browser => {
const page = await browser.pages().then(p=>p[0])
page.goto('https://highseas.hackclub.com/')
// after login ...

await page.goto("https://highseas.hackclub.com/wonderdome")
await wait(100);

})