export default `#graphql
  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category!
    suggestCategories(ids: [ID]): [Category]!
  }
  extend type Mutation {
    addCategory(input: CategoryInput!): Category!
    updateCategory(id: ID!, input: CategoryInput!): Category!
    deleteCategory(id: ID!): Category!
  }
  extend type Subscription {
    categoryAdded: Category!
    categoryUpdated: Category!
    categoryDeleted: Category!
  }
  type Category {
    id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
  }
  input CategoryInput {
    name: String!
  }
`;
