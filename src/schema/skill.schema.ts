export default `#graphql
  extend type Query {
    skills: [Skill!]!
    skill(id: ID!): Skill!
    suggestedSkills(ids: [ID]): [Skill]!
  }
  extend type Mutation {
    addSkill(name: String!): Skill!
    updateSkill(id: ID!, name: String!): Skill!
  }
  type Skill {
    id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
  }
`;
