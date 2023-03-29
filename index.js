//SETUP Express
//Pau Pau Food Playlist. handle JSON data to and fro

const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const MongoClient = mongodb.MongoClient;
// ./ means relative path
const MongoUtil = require("./MongoUtil");// path to MongoUtil.js 
const dotenv = require("dotenv");
dotenv.config();//modify the env variables 

const MONGO_URI = process.env.MONGO_URI;

let app = express();
app.use(express.json());//allow express to handle json and send json 
app.use(cors());

//ROUTING for API
async function main(){
    // let db = await connect();
    await MongoUtil.connect(MONGO_URI, "paupau_food_playlist_db"); //switch to db
    
    const db = MongoUtil.getDB();

    //localhost:8888/playlist
    app.get('/playlist', async(req, res)=>{
        let playlist = await db.collection('playlist').find().toArray();
        res.status(200);
        res.send(playlist);
    });

    app.post('/playlist', async(req, res) => {
        const { playlistName, numOfMeals, deliveryTime, startDate, endDate, status, cuisineTags, excludedIngredients } = req.body;
        const results = await db.collection('playlist').insertOne({
            playlistName: playlistName,
            numOfMeals: numOfMeals,
            deliveryTime: deliveryTime,
            startDate: startDate,
            endDate: endDate,
            status: status,
            cuisineTags: cuisineTags,
            excludedIngredients: excludedIngredients
        });
        res.status(200);
        res.send(results);
    })

    //localhost:8888/user
    app.get('/user', async(req, res)=>{
        let user = await db.collection('user').find().toArray();
        res.status(200);
        res.send(user);
    });

    app.post('/user', async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        const results = await db.collection('user').insertOne({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
        // let user = await db.collection('user').findOne({_id: results.insertedID})
        res.status(200);
        res.send(results);
    });

    //localhost:8888/restaurant
    app.get('/restaurant', async(req, res)=>{
        let restaurant = await db.collection('restaurant').find().toArray();
        res.status(200);
        res.send(restaurant);
    });

    //localhost:8888/menu
    app.get('/menu', async(req, res)=>{
        let menu = await db.collection('menu').find().toArray();
        res.status(200);
        res.send(menu);
    });

}

main();

app.listen(process.env.PORT || 8888, ()=>{
    console.log(`Server started..listing to PORT 8888`);
});