import "reflect-metadata";
import { createConnection } from "typeorm";
import "dotenv/config";
// import { User } from "./entity/User";
//import { createConnection } from "net";
import { ApolloServer } from "apollo-server-express";
import * as session from "express-session";
import * as express from "express";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    context: ({ req, res }: any) => ({ req, res }),
  });

  await createConnection();
  const app = express();

  app.use(
    session({
      secret: "cjokglfkgflggf",
      resave: false,
      saveUninitialized: false,
    })
  );

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "http://localhost:3000",
    },
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};
startServer();
