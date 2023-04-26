require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const routes = require("./routes/routes")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 4000

// Database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const db = mongoose.connection

// db.on("error", () => console.log("connection error"));
// db.once("open", function () {
//   console.log("Connected successfully to " + process.env.DB_URI);
// });

db.on('connected', function() {
  console.log('database is connected successfully');
});
db.on('disconnected',function(){
  console.log('database is disconnected successfully');
})
db.on('error', console.error.bind(console, 'connection error:'));

//Middlewares
app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use(cors())

app.use(session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false
}))

app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

// Routes
app.use("/api/v1", routes)

app.listen(PORT, () => {
    console.log(`Server started at port http://localhost:${PORT}`)
})
