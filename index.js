const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express()

// middleware
app.use(cors())
app.use(express.json())


// nextech-marvels EaoIzwx8ROWqC5Gu




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://nextech-marvels:EaoIzwx8ROWqC5Gu@cluster0.5prtsfh.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productsCollection = client.db('productsDB').collection('products');
    const AddCartProductsCollection = client.db('productsDB').collection('addCart');

    app.get('/products/:brand',async(req,res)=>{
            const brand = req.params.brand.toLowerCase();
            const query = {brand : brand};
            const result = await productsCollection.find(query).toArray();
            res.send(result)       
    })

    app.get('/product/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await productsCollection.findOne(query);
      res.send(result)
    })

    app.post('/addProduct',async(req,res)=>{
        const product = req.body;
        const result = await productsCollection.insertOne(product);
        res.send(result);
    })

    app.post('/addCart',async(req,res)=>{
      const addProduct = req.body;
      const result = await AddCartProductsCollection.insertOne(addProduct);
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
   res.send('HEllO World');
})

app.listen(port,()=>{
    console.log(`the server is running port ${port}`);
})
