require('dotenv').config();
const express = require('express');
const app = express();
const CardRouter = require('./controllers/cards');
const UserRouter = require('./controllers/user');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');

//middleware
app.use(express.static("public"));
app.use(express.urlencoded()); //allows the the req.body to be read from the form
//will have a prefix of /card on top of what is defined as a path on Cardrouter
app.use(methodOverride('_method'));
//the set up below is how we add the ability to track if the user has authorization to access authorized routes
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true, 
    resave: false,
}));
app.use("/card", CardRouter);
app.use("/user", UserRouter);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Listen
const PORT = process.env.PORT || 3020;
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })