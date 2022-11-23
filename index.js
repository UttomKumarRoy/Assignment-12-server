const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
//const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//const jwt = require('jsonwebtoken');
require('dotenv').config();
//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mcmgyi9.mongodb.net/?retryWrites=true&w=majority"`;
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mcmgyi9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const buyersCollection = client.db('laptopReseller').collection('buyers');

        
        app.post('/buyers',  async (req, res) => {
            const buyer= req.body;
            const result = await buyersCollection.insertOne(buyer);
            res.send(result);
        });
    }
    finally {

    }

}

run().catch(err => console.error(err));

app.get('/', async (req, res) => {
    res.send('Laptop Reseller Server is running');
})

app.listen(port, () => console.log(`Laptop Reseller Server running on ${port}`))
