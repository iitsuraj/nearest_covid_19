var app = require("./app");
var { cronJobs } = require("./actions");

app.listen(3000 || process.env.PORT, () => {
  console.log("are you ready");
});
