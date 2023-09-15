export default `#graphql
  type Address {
    street: String
    city: String
    state: String
    zip: String
    country: String
    houseNumber: String
  }
  input AddressInput {
    street: String
    city: String
    state: String
    zip: String
    country: String
    houseNumber: String
  }
  type Contacts {
    emails: [String]
    phones: [String]
  }
  input ContactsInput {
    emails: [String]
    phones: [String]
  }
  type Coordinates {
    latitude: Float
    longitude: Float
  }
  input CoordinatesInput {
    latitude: Float
    longitude: Float
  }
  type BankDetail {
    bankName: String
    iban: String
    bic: String
  }
  input BankDetailInput {
    bankName: String
    iban: String
    bic: String
  }
`;
