export default `#graphql
  extend type Query {
    cemetery(id: ID!): Cemetery
  }
  extend type Mutation {
    addCemetery(input: AddCemeteryInput!): Cemetery
  }
  type Cemetery {
    id: ID!
    name: String
    address: Address
    coordinates: Coordinates
    notes: String
    trustee: Trustee
    createdAt: String
    updatedAt: String
  }
  input AddCemeteryInput {
    name: String
    address: AddressInput
    coordinates: CoordinatesInput
    notes: String
    trustee: ID!
  }
`;
