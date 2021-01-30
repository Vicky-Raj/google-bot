const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const bot = require("./bot");
const path = require("path");

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get("/data", (req, res) => {
    fs.readFile("data.json", (err, data) => {
        res.json(JSON.parse(data));
    });
});

app.post("/data", (req, res) => {
    const { classData, tableData } = req.body;
    tableData.forEach((data) => {
        delete data["tableData"];
    });
    classData.forEach((data) => {
        delete data["tableData"];
    });
    fs.writeFile(
        "data.json",
        JSON.stringify({ classes: classData, timeTable: tableData }),
        () => {
            res.send();
        }
    );
});

app.post("/join", async (req, res) => {
    await bot.joinClass();
    res.send();
});

app.post("/leave", async (req, res) => {
    await bot.leaveClass();
    res.send();
});

app.post("/attend", async (req, res) => {
    await bot.attend();
    res.send();
});

app.listen(8000, console.log("listening"));
bot.joinClass();
