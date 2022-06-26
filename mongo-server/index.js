const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;

// Cors and express Middleware
app.use(cors());
// body-parser Middleware
app.use(express.json());

// user: anirban
// password: ZtAbR2ByLhGtnVoV

// MongoDB connection
const uri =
  "mongodb+srv://anirban:ZtAbR2ByLhGtnVoV@cluster0.w2lwko6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Data async await
async function run() {
  try {
    await client.connect();
    const usersCollection = client.db("foodExpress").collection("users");
    // creating API
    // Get all user on the UI / rendering/ To get all existing user
    app.get('/user', async(req, res)=>{
        const query = {};
        const cursor = usersCollection.find(query);
       const user=  await cursor.toArray();
       res.send(user);
    })
    // Get one User
    app.get('/user/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await usersCollection.findOne(query);
      res. send(result)
  })
    // Post User: Add user
    app.post('/user', async(req, res)=>{
        const newUser = req.body
        console.log(`add new user`, newUser);
        const result = await usersCollection.insertOne(newUser)
        res.send(result)   
    })
    // UPdate User
    app.put('/user/:id', async(req, res)=>{
        const id = req.params.id;
        const updatedUser = req.body;
        // const query = {_id: ObjectId(id)};   [you can write query instead of filter]
        const filter = {_id: ObjectId(id)};
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            name: updatedUser.name,
            email: updatedUser.email
          }
        };
        const result = await usersCollection.updateOne(filter, updateDoc, options);
        res. send(result)
    })
    // Delete User
    app.delete('/user/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await usersCollection.deleteOne(query);
        res. send(result)
    })

    
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

// API
app.get("/", (req, res) => {
  res.send("Data send to server successfully");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
