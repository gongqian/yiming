gongqian/TvabkXNvo0tgnEOs



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://gongqian:<password>@cluster0.3dxb8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
{ 
    "_id": ObjectId("54bb201aa3a0f26f885be2a3")
    "photo": "imagename.png",
    "likeCount": 0
    "likes": []
}

db.photos.update(
    { 
        "_id": ObjectId("54bb201aa3a0f26f885be2a3"), 
        "likes": { "$ne": ObjectId("54bb2244a3a0f26f885be2a4") }
    },
    {
        "$inc": { "likeCount": 1 },
        "$push": { "likes": ObjectId("54bb2244a3a0f26f885be2a4") }
    }
)

db.photos.update(
    { 
        "_id": ObjectId("54bb201aa3a0f26f885be2a3"), 
        "likes": ObjectId("54bb2244a3a0f26f885be2a4")
    },
    {
        "$inc": { "likeCount": -1 },
        "$pull": { "likes": ObjectId("54bb2244a3a0f26f885be2a4") }
    }
)

db.photos.find(
    { 
        "_id": ObjectId("54bb201aa3a0f26f885be2a3"), 
    },
    { 
       "photo": 1
       "likeCount": 1,
       "likes": { 
          "$elemMatch": { "$eq": ObjectId("54bb2244a3a0f26f885be2a4") }
       }
    }
)