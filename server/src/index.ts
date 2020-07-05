// import "reflect-metadata";
import { createConnection } from "typeorm";
// import { User } from "./entity/User";
//import { createConnection } from "net";
import { ApolloServer } from "apollo-server-express";
import * as session from "express-session";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import * as express from "express";

const startServer = async () => {
  const PORT = 4000;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => ({ req }),
  });
  await createConnection();
  const app = express();

  app.use(
    session({
      secret: "ccddkkmmcckkmm",
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

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};
startServer();
