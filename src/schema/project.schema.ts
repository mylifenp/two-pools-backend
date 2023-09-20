export default `#graphql
  extend type Query {
    projects: [Project!]!
    project(id: ID!): Project!
  }
  extend type Mutation {
    addProject(input: ProjectInput): Project!
    updateProject(id: ID!, input: ProjectInput): Project!
    deleteProject(id: ID!): Project!
  }
  extend type Subscription {
    projectAdded: Project!
    projectUpdated(id: ID!): Project!
    projectDeleted(id: ID!): Project!
  }
  input ProjectInput {
    title: String
    location: String
    estimation: EstimationInput
    description: String
    categories: [ID]
    attachments: [ID]
    experience_level: ExperienceLevel
    required_skills: [ID]
  }
  type Project {
    id: ID!
    user: User!
    title: String!
    location: String!
    estimation: Estimation!
    description: String!
    categories: [Category]!
    attachments: [Attachment]!
    experience_level: ExperienceLevel!
    required_skills: [Skill!]!
    createdAt: Date!
    updatedAt: Date!
  }
`;
