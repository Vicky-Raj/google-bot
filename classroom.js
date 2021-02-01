const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());
let told = false;
class GoogleClassBot {
    constructor(){
        this.told = false;
    }
    async createBrowser() {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--use-fake-ui-for-media-stream",
                "--disable-audio-output",
            ],
        });
        return browser;
    }

    async attend(page) {
        if(!this.told){
        await page.type("textarea[name=chatTextInput]", "248 present", {
            delay: 0,
        });
        await page.keyboard.press("Enter");
        this.told = true;
        }
    }

    async enterClass(browser, email, pass, url) {
        let loggedin = false;
        const page = await browser.newPage();
        await page.waitForTimeout(4000);
        await page.goto(
            "https://accounts.google.com/signin/v2/identifier?hl=en&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
        );
        await page.waitForTimeout(5000);

        try {
            await page.type("input#identifierId", email, {
                delay: 0,
            });
        } catch (e) {
            loggedin = true;
        }
        if (!loggedin) {
            await page.click("div#identifierNext");
            await page.waitForTimeout(5000);
            await page.type("input[name=password]", pass, {
                delay: 0,
            });
            await page.click("div#passwordNext");
            await page.waitForTimeout(8000);
        }
        await page.goto(url);
        await page.waitForTimeout(7000);
        try {
            await page.click("div.IYwVEf.HotEze.uB7U9e.nAZzG");
        } catch (e) {
            console.log("\naudio seems to disabled already");
        }
        await page.waitForTimeout(3000);
        try {
            await page.click("div.IYwVEf.HotEze.nAZzG");
        } catch (e) {
            console.log("\nvideo seems to be disabled already");
        }

        await page.waitForTimeout(3000);
        console.log("clicking on join");
        await page.click("span.NPEfkd.RveJvd.snByac");
        //NPEfkd RveJvd snByac"
        await page.waitForTimeout(5000);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(3000);
        try {
            await page.click("div.IYwVEf.HotEze.uB7U9e.nAZzG");
        } catch (e) {
            console.log("\naudio seems to disabled already");
        }
        await page.waitForTimeout(3000);
        try {
            await page.click("div.IYwVEf.HotEze.nAZzG");
        } catch (e) {
            console.log("\nvideo seems to be disabled already");
        }
        await page.waitForTimeout(3000);
        await page.click("span.DPvwYc.sm8sCf.KdraA");
        return page;
    }

    startScan(page) {
        let timeout = null;
        const attendes = {};
        return setInterval(async () => {
            if(!this.told){
                const messages = await page.$$("div.GDhqjd");
                const senderCondition = new RegExp("18TUCS2([4-5])([0-9])");
                for(const message of messages){
                    const sender = await page.evaluate(
                        (el) => el.getAttribute("data-sender-name"),
                        message
                    );
                    if(senderCondition.test(sender)){
                        const textCondition1 = new RegExp("[2]?([4-5])([0-9]) present", "i");
                        const textCondition2 = new RegExp("present","i");
                        const texts = await message.$$eval("div.oIy2qc", els => els.map(el => el.innerText));
                        for(const text of texts){
                            if(textCondition1.test(text) || textCondition2.test(text)){  
                                const delay = Number(senderCondition.exec(sender)[2]);
                                const safe = Number(senderCondition.exec(sender)[1]);
                                const rollno = `${safe}${delay}`;
                                if(!(rollno in attendes)){
                                    attendes[rollno] = 0
                                    if (Object.keys(attendes).length > 0){
                                        clearTimeout(timeout);
                                        timeout = setTimeout(()=>{this.attend(page)},
                                            (8 - delay) * (5 - safe) * 8000);
                                    }  
                                }                  
                            }
                        }
                    }
            }
        }
        }, 2000);
    }
}

module.exports = GoogleClassBot;
