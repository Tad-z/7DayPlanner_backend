const express = require("express");
const app = express();
const main = require("./models/db");
const userRouter = require("./routes/user");
const planRouter = require("./routes/plan");
require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


main()
.then ( ()=> {
    return console.log("DB connected");
}) .catch(console.error);

app.listen(5000, () => {
    console.log("Server connected.....")
})

app.use('/api/user', userRouter);
app.use('/api/plans', planRouter);
