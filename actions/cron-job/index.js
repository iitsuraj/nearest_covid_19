var cron = require("node-cron");

/*
    List of all automated tasks
    
        1. Get latest Corona Data from ______ and save to Database in every 5 mint
*/

exports.corona_data = () => {
  cron.schedule("*/5 * * * *", () => {
    console.log("running a task every 5 mints");
  });
};
