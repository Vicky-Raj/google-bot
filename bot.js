const GoogleClassBot = require("./classroom");
var schedule = require("node-schedule");
const fs = require("fs");

const bot = new GoogleClassBot();
let browsers = [];
let pages = [];
let interval = null;
let joining = false;
let leaving = false;

const students = [{ email: "18tucs248@skct.edu.in", pass: "passwordvi" },{ email: "18tucs248@skct.edu.in", pass: "passwordvi" }];

const getClass = () => {
    const date = new Date();
    const timeTable = JSON.parse(fs.readFileSync("data.json")).timeTable;
    try {
        const cls = timeTable[date.getDay()-1][date.getHours()];
        return  cls === "none" ? undefined : cls;
    } catch (e) {
        return undefined;
    }
    // return "https://meet.google.com/lookup/apskosbsib";
};

const leaveClass = async (index) => {
    if (!leaving) {
        leaving = true;
        if (pages[index]) {
            await pages[index].close();
            pages[index] = undefined;
        }
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        leaving = false;
    }
};

const enterClass = async (index)=>{
    browsers[index] = browsers[index] ? browsers[index] : await bot.createBrowser();
    await leaveClass(index);
    const currentClass = getClass();
    if (currentClass) {
        pages[index] = await bot.enterClass(browsers[index], students[index].email, students[index].pass, currentClass);
        // interval = bot.startScan(page);
    }
}

const joinClass = async () => {
    for(let i=0;i<students.length;i++){
        await enterClass(i);   
    }
};

const attend = async () => {
    if (interval && page) {
        await bot.attend(page);
    }
};

let rule = new schedule.RecurrenceRule();
rule.hour = [10, 11, 12, 13, 14, 15, 16];
rule.minute = [5, 5, 5, 5, 5, 5, 5];

let j = schedule.scheduleJob(rule, async () => {
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
    attend,
};
