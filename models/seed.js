const mongoose = require('./connection');
const Card = require('./Card');


mongoose.connection.on('open', async () => {

    //1. create entries into the db using the startCards
    //1a. in order to do this we need to delete everything
    await Card.deleteMany();

    //1b. then using startCards, we will insert that into the db
    const startCards = [
        { name: "Tornado Dragon", type: "XYZ Monster", atk: 2100, def: 2000, level: 4, img: "https://images.ygoprodeck.com/images/cards/6983839.jpg", Playable: true },

        { name: "Summoned Skull", type: "Normal Monster", atk: 2500, def: 1200, level: 6, img: "https://images.ygoprodeck.com/images/cards_small/70781052.jpg", Playable: false },

        { name: "Dark Magician", type: "Normal Monster", atk: 2500, def: 2100, level: 7, img: "https://images.ygoprodeck.com/images/cards_small/46986421.jpg", Playable: true },

        { name: "Dark Magician Girl", type: "Effect Monster", atk: 2000, def: 1700, level: 6, img: "https://images.ygoprodeck.com/images/cards/38033121.jpg", Playable: true },

        { name: "Blue-Eyes White Dragon", type: "Normal Monster", atk: 3000, def: 2500, level: 8, img: "https://images.ygoprodeck.com/images/cards_small/89631139.jpg", Playable: true },
    ];
    await Card.create(startCards);

    //2. we are going to close the connection
    mongoose.connection.close();
});


