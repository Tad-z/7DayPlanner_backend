const express = require("express");
const app = express();
const main = require("./models/db");
const userRouter = require("./routes/user");
const planRouter = require("./routes/plan");
const cors = require("cors")
require("dotenv").config();



app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: '*', // Allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allows specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allows specific headers
    credentials: true // Allows credentials (optional)
  }));


main()
.then ( ()=> {
    return console.log("DB connected");
}) .catch(console.error);

app.listen(5000, () => {
    console.log("Server connected.....")
})

app.use('/users', userRouter);
app.use('/events', planRouter);
