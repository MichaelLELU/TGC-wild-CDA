import "reflect-metadata";
import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import { AdResolver } from "./resolvers/AdResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { TagResolver } from "./resolvers/TagResolver";

const port = 3000;

const start = async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
  });

  const apiServer = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(apiServer, {
    listen: { port: port },
  });
  console.log("server started 🚀🚀 at", url);
};
start();
