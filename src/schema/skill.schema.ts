export default `#graphql
  extend type Query {
    skills: [Skill!]!
    skill(id: ID!): Skill!
    suggestSkills(ids: [ID]): [Skill]!
  }
  extend type Mutation {
    addSkill(input: SkillInput!): Skill!
    updateSkill(id: ID!, input: SkillInput!): Skill!
    deleteSkill(id: ID!): Skill!
  }
  extend type Subscription {
    skillAdded: Skill!
    skillUpdated(id: ID!): Skill!
    skillDeleted: Skill!
  }
  type Skill {
    id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
  }
  input SkillInput {
    name: String!
  }
`;
