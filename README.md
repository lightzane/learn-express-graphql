# learn-express-graphql

Learn GraphQL (https://graphql.org/) from scratch on Express (https://expressjs.com/) and NodeJS (https://nodejs.org/en/)

1. Initialize the project

```
npm init -y
npm i express
npm i -D typescript nodemon ts-node
npx tsc --init
```

2. Update `tsconfig.json`

```json
{
  "baseUrl": ".",
  "outDir": "./dist",
  "noImplicitAny": false
}
```

3. Create `src/main.ts`
4. Update `package.json`

```json
{
  "scripts": {
    "start": "nodemon src/main.ts --watch src"
  }
}
```

5. Install `express` and other dependencies

```
npm i express body-parser
npm i -D @types/express
```

`body-parser` is used to parse and read input data/body from the request

6. Update `src/main.ts`

```ts
import express from 'express';

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log(`🚀 Listening to http://localhost:3000`);
});
```

7. Install `graphql` and other dependencies

```
npm i graphql apollo-server-express
```

8. Update `src/main.ts`

```ts
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(bodyParser.json());

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Need before calling the applyMiddleware
  await server.start();
  server.applyMiddleware({ app });

  app.listen(3000, () => {
    console.log(`🚀 Listening to http://localhost:3000${server.graphqlPath}`);
  });
};

startApolloServer();
```

9. Create sample data

**src/shared/data/grocery-list.ts**

```ts
export const GROCERY_LIST: string[] = [];
```

10. Create `typeDefs` or GraphQL schema

**src/graphql/type-defs.ts**

```ts
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
    groceryList: [String]
  }

  type Mutation {
    addGrocery(item: String!): [String]
  }
`;
```

11. Create `resolvers` for GraphQL

**src/graphql/resolvers**

```ts
import { GROCERY_LIST } from '../shared/data/grocery-list';

export const resolvers = {
  Query: {
    hello: () => 'Hello World',
    groceryList: () => GROCERY_LIST,
  },
  Mutation: {
    // the "_" is the parent resolver, and 2nd parameter are the "args"
    // -- Hint: use ES6 Destructuring assignment for the "args"
    addGrocery: (_, { item }): string[] => {
      GROCERY_LIST.push(item);
      return GROCERY_LIST;
    },
  },
};
```

12. `npm start`

There are many ways to try GraphQL.

- [REST API or Curl](#rest-api)
- [Apollo Sandbox](#apollo-sandbox)
- [GraphQL Playground](#graphql-playground)

##### REST API

```
POST http://localhost:3000/graphql
REQUEST BODY
{
    "query": "{ hello }"
}
```

```curl
curl --request POST ^
  --header "content-type: application/json" ^
  --url http://localhost:3000/graphql ^
  --data "{\"query\":\"{ hello }\"}"
```

##### Apollo Sandbox

After `npm start`, just go visit `http://localhost:3000/graphql` and click on the button `Query your server`

##### GraphQL Playground

Install `apollo-server-core` to get the **GraphQL Playground**

```
npm i apollo-server-core
```

Update the `src/main.ts`

```diff
+   import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

    const server = new ApolloServer({
        typeDefs,
        resolvers,
+       plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
    });
```

Run `npm start` and visit `http://localhost:3000/graphql

## Other

- https://github.com/lightzane/learn-nestjs-graphql
- https://github.com/lightzane/review-nestjs-graphql
