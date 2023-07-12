const express = require('express');
const Card = require('../models/Card');

//routing middleware that allows the routes defined on this file to be used on our server.js file
// as app.use('/card', CardRouter)
const router = express.Router();


router.use((req, res, next) => {
    // req.session 
    //check to see if the user is logged in via the req.session.loggedIn property. This property was defined in the controller.user.js file
    //if the user is loggedIn we are going to use the next() which means allow the user to access the routes defined below
    if(req.session.loggedIn){
        next();
    } else {
        //else the user is NOT loggedIn, therefore just have the user redirected to the login page.
        res.redirect('/user/login')
    }
})

//controllers
router.get('/', async (req, res) => {
    const allCards = await Card.find({ username: req.session.username })
    res.render(
        'cards/index.ejs',
        { cards: allCards, user: req.session.username }
    )
});


router.get('/new', (req, res) => {
    res.render('cards/new.ejs')
})


router.post('/', async (req, res) => {

    if(req.body.Playable === 'on'){
        req.body.Playable = true;
    }else {
        req.body.Playable = false;
    }
 
    req.body.username = req.session.username; 

    
    await Card.create(req.body);
    res.redirect('/card');
})


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const card = await Card.findById(id);
    res.render("cards/show.ejs", { card })
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Card.findByIdAndDelete(id);
    res.redirect('/card')
})


router.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const card = await Card.findById(id);
    res.render('cards/edit.ejs', { card })
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    req.body.Playable = req.body.Playable === 'on' ? true : false;
    await Card.findByIdAndUpdate(id, req.body);
    res.redirect('/card')
})



module.exports = router;