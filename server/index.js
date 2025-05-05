const express = require('express');
const app = express();
const cors = require('cors');

app.use("/", async (req, res) => {
    try 
    {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
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
        console.error('스크래핑 중 오류 발생:', error.message);
        res.status(500).send('웹툰 데이터를 가져오는 중 오류 발생');
    }
});

app.listen(3000, console.log("Server started on PORT 3000"));