export default `#graphql
  extend type Query {
    health: Health!
    DBHealth: Health!
    RedisHealth: Health!
  }
  extend type Mutation {
    health(status: String!): Health!
  }
  extend type Subscription {
    health: Health
  }
  type Health {
    status: String!
    moreInfo: String
  }
`;
