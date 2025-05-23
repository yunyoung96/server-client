let express;
let app;
let cros;
let cheerio;
let chromium;
let puppeteer;

try
{
    express = require('express');
    app = express();
    cors = require('cors');
    cheerio = require('cheerio');
    chromium = require("@sparticuz/chromium");
    puppeteer = require("puppeteer-core");
}
catch(error)
{
    console.error('라이브러리르 받던 중:', error.message);
}



app.use("/", async (req, res) => {
    let browser;
    try 
    {
        console.log("Launching browser...");
        browser = await puppeteer.launch({
            args: puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
            executablePath: await chromium.executablePath(),
            headless: "shell",
          });
    }
    catch(error)
    {
        console.error('서버를 받던 중:', error.message);
        res.status(500).send(`서버를 받던 중: ${error.message}`);
    }
    try
    {
        console.log("Opening new page...");
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        console.log("Navigating to webtoon site...");
        await page.goto('https://comic.naver.com/webtoon?tab=mon', { waitUntil: 'networkidle0' });
    
        const content = await page.content();
        const $ = cheerio.load(content);

        const titleElements = $('.ContentTitle__title--e3qXt .text');
        console.log(`총 ${titleElements.length}개의 웹툰 제목이 발견되었습니다.\n`);
    
        const webtoons = [];
        titleElements.each((i, el) => {
            const title = $(el).text().trim();
            webtoons.push({ title });
        });
    
        await browser.close();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(webtoons);
    }
    catch(error)
    {
        console.error('데이터 받던 중:', error.message);
        res.status(500).send(`데이터를 받던 중: ${error.message}`);
    }
});

app.listen(3000, console.log("Server started on PORT 3000"));