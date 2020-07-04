import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }
  type Query {
    me: User!
  }
  type Mutation {
    register(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Boolean!
    login(email: String!, password: String!): User!
  }
`;
