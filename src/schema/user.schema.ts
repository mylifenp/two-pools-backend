export default `#graphql
  extend type Query {
    userInfo: User!
  }
  type User {
    id: ID!
    email: String,
    preferred_username: String,
    name: String,
    given_name: String,
    family_name: String,
    org_roles: [OrganizationRoles],
    organization: String,
  }
  type OrganizationRoles {
    roles: [String],
    name: String,
    org_id: String,
  }
`;
