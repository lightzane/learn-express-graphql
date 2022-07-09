import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query {
        hello: String
        groceryList: [String]
    }

    type Mutation {
        addGrocery(item: String!): [String]
    }
`;