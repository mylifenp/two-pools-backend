export default `#graphql
  extend type Query {
    trustee(id: ID!): Trustee
    test: Test
  }
  extend type Mutation {
    addTrustee(input: AddTrusteeInput!): Trustee
    updateTrustee(id: ID!, input: AddTrusteeInput!): Trustee
  }
  extend type Subscription {
    trusteeUpdated: TrusteeUpdated!
  }
  type Test {
    name: String
    email: String
  }

  type Trustee {
    id: ID!
    name: String
    contacts: Contacts
    address: Address
    notes: String
    cemeteries: [Cemetery]
    bankDetails: [BankDetail]
    createdAt: String
    updatedAt: String
  }
  
  input AddTrusteeInput {
    name: String
    contacts: ContactsInput
    address: AddressInput
    bankDetails: [BankDetailInput]
    notes: String
  }

  type TrusteeUpdated {
    id: ID!
    event: String!
    trustee: Trustee!
  }
`;
