export default `#graphql
  extend type Query {
    isEmailSubscribed(input: EmailSubscriptionInput!): Result!
  }
  extend type Mutation {
    addEmailSubscription(input: EmailSubscriptionInput!): Result!
    deleteEmailSubscription(input: EmailSubscriptionInput!): Result!
  }
  type EmailSubscription {
    id: ID!
    email: String!
    active: Boolean!
    createdAt: String
    updatedAt: String
  }
  input EmailSubscriptionInput {
    email: String!
  }
`;
