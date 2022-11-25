const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
//const jwt = require('jsonwebtoken');
require('dotenv').config();
//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mcmgyi9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const usersCollection = client.db('laptopReseller').collection('users');

        app.get('/users/:email', async (req,res) =>{
            const email=req.params.email;
            const user= await usersCollection.findOne({email:email});
            res.send({userType:user.userType})
        })

        app.post('/users',  async (req, res) => {
            const user= req.body;
            const email= await usersCollection.findOne({email:user.email});
            if(email){
                res.send({response:"User already found"});
            } else{
                const result = await usersCollection.insertOne(user);
                res.send({response:"User created and User info saved in database"});
            }
           
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
