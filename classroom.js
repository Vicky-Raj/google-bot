const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

class GoogleClassBot {
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
        await page.type("textarea[name=chatTextInput]", "248 present", {
            delay: 0,
        });
        await page.keyboard.press("Enter");
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
        let told = false;
        return setInterval(async () => {
            if (!told) {
                let messages = await page.$$("div[data-message-text]");
                const reg = new RegExp("[2]?([4-5])([0-9]) present", "i");
                for (const message of messages) {
                    const text = await page.evaluate(
                        (el) => el.innerText,
                        message
                    );
                    if (reg.test(text)) {
                        const delay = Number(reg.exec(text)[2]);
                        const safe = Number(reg.exec(text)[1]);
                        setTimeout(
                            this.attend,
                            (8 - delay) * (5 - safe) * 8000,
                            page
                        );
                        told = true;
                    }
                }
            }
        }, 2000);
    }
}

module.exports = GoogleClassBot;
