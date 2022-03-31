import {
    Bson,
    MongoClient,
  } from "https://deno.land/x/mongo/mod.ts";
  
  // - connect to the mongodb
  const connect = async () => {
    const client = new MongoClient();
  
    await client.connect({
      db: "posts",
      tls: true,
      servers: [
        {
          host: "cluster0-shard-00-01.3dxb8.mongodb.net",
          port: 27017,
        },
      ],
      credential: {
        username: "gongqian",
        password: "TvabkXNvo0tgnEOs",
        db: "posts",
        mechanism: "SCRAM-SHA-1",
      },
    });
  
    return client;
  }
  
  // Defining schema interface
  interface PositionSchema {
    _id: Bson.ObjectId;
    role_name: string;
    customer_name: string;
    remote_work_allowed: boolean;
  }
  
  // - insert an object
  const insertPosition = async (args: any) => {
    const client = await connect();
    const db = client.database("test");
    const positions = db.collection<PositionSchema>("positions");
    const insertId = await positions.insertOne({
      role_name: args.roleName,
      customer_name: args.customerName,
      remote_work_allowed: args.remoteWorkAllowed
    });
    return positions.findOne({ _id: insertId }, { noCursorTimeout: false });
  }
  // - return the object
  
  const allPositions = async() => {
    const client = await connect();
    const db = client.database("test");
    const positions = db.collection<PositionSchema>("positions");
    return await positions.find({}, { noCursorTimeout: false}).toArray();
  }
  
  export const resolvers = {
    Query: {
      hello: () => `Hello World!`,
      allPositions: () => allPositions()
    },
    Mutation: {
      insertPosition: (_: any, args: any) => insertPosition(args)
    }
  }