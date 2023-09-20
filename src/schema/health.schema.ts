export default `#graphql
  extend type Query {
    health: Health!
  }
  extend type Mutation {
    health(status: String!): Health!
  }
  type Health {
    status: String!
  }
`;
