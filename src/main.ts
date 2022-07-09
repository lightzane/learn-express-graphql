import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/type-defs';

const app = express();
app.use(bodyParser.json());

const startApolloServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
    });

    // Need before calling the applyMiddleware
    await server.start();
    server.applyMiddleware({ app });

    app.listen(3000, () => {
        console.log(`🚀 Listening to http://localhost:3000${server.graphqlPath}`);
    });
};

startApolloServer();