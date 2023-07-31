const fs = require("fs");
const fsP = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvents = async (message, logFile) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsP.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsP.appendFile(path.join(__dirname, "..", "logs", logFile), logItem);
  } catch (error) {
    console.log(error);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.header.origin}\t${req.url}`, "reqLog.txt");
  console.log(
    ` -> resquest medhod : ${req.method} | resquest URL : ${req.url} \n`
  );
  next();
};

module.exports = { logger, logEvents };
