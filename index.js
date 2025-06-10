const express = require('express');
const app = express();

const MAX_TOKENS = 4;
const REFILL_AMOUNT = 2;
const REFILL_INTERVAL_MS = 10000;
let tokenCount = MAX_TOKENS;

function tokenRefiller() {
  tokenCount = Math.min(tokenCount + REFILL_AMOUNT, MAX_TOKENS);
  console.log("Tokens refilled:", tokenCount);
}

function rateLimiter(_req, res, next) {
  if (tokenCount > 0) {
    tokenCount--;
    console.log("Used 1 token. Remaining:", tokenCount);
    next();
  } else {
    console.log("Throttled");
    res.status(429).send("Too Many Requests");
  }
}

setInterval(tokenRefiller, REFILL_INTERVAL_MS);

app.use(rateLimiter);

app.get("/", (_req, res) => {
  res.send("Success");
});

const userRouter = require("./routes/user");
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
