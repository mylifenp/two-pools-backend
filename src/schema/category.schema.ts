export default `#graphql
  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category!
    suggestCategories(ids: [ID]): [Category]!
  }
  extend type Mutation {
    addCategory(name: String!): Category!
    updateCategory(id: ID!, name: String!): Category!
    deleteCategory(id: ID!): Category!
  }
  type Category {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
  }
`;
