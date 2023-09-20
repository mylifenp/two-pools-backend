export default `#graphql
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
