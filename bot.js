const GoogleClassBot = require("./classroom");
var schedule = require('node-schedule');
const fs = require("fs");

const bot = new GoogleClassBot();
let broswer = null;
let page = null;
let interval = null;
let joining = false;
let leaving = false;

const EMAIL = "18tucs248@skct.edu.in";
const PASS = "passwordvi";


const getClass = () => {
    // const date = new Date();
    // const timeTable = JSON.parse(fs.readFileSync("data.json")).timeTable;
    // try {
    //     const cls = timeTable[date.getDay()-1][date.getHours()];
    //     return  cls === "none" ? undefined : cls;
    // } catch (e) {
    //     return undefined;
    // }
    return "https://meet.google.com/lookup/ferg3gtgl7"
};

const leaveClass = async () => {
    if (!leaving) {
        leaving = true;
        if (page) {
            await page.close();
            page = null;
        }
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        leaving = false;
    }
};

const joinClass = async () => {
    if (!joining) {
        joining = true;
        broswer = broswer ? broswer : await bot.createBrowser();
        await leaveClass();
        const currentClass = getClass();
        if (currentClass) {
            page = await bot.enterClass(broswer, EMAIL, PASS, currentClass);
            interval = bot.startScan(page);
        }
        joining = false;
    }
    
};

const attend = async()=>{
    if(interval && page){
        await bot.attend(page);
    }
}


let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [1,2,3,4,5,6];
rule.hour = [9,10,11,12,13,14,15,16];
rule.minute = 0;
 
let j = schedule.scheduleJob(rule,async()=>{
    await joinClass();
});


// schedule.Job.prototype.nextDates = function(count = 1) {
//     const dates = [];
  
//     if (!this.pendingInvocations().length) {
//       return dates;
//     }
  
//     const rule = this.pendingInvocations()[0].recurrenceRule;
  
//     if (rule.nextInvocationDate) {
//       // Rule is a RecurrenceRule
//       let date = new Date();
//       for (let i = 0; i < count; i++) {
//         date = rule.nextInvocationDate(date);
//         dates.push(date.toString());
//       }
//     } else {
//       // Rule is a CronExpression
//       for (let i = 0; i < count; i++) {
//         dates.push(rule.next().toString());
//       }
//     }
  
//     return dates;
//   };
  
//   // Print next 5 job times
//   schedule
//     .scheduleJob(rule, () => console.log('test'))
//     .nextDates(20)
//     .forEach(x => console.log(x));


module.exports = {
    leaveClass,
    joinClass,
    attend
}

