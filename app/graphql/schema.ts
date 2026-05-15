import { buildSchema } from "graphql";

export const typeDefs = buildSchema(`
  type Page {
    id: String!
    name: String!
    data: JSON
    lastUpdated: String
    published: String
  }

  scalar JSON

  type Query {
    pages: [Page]
    page(id: String!): Page
  }
`);
