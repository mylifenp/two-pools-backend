export default `#graphql
  extend type Query {
    chapters: [Chapter]
    chapter(id: ID!): Chapter
  }

  type Chapter {
    id: ID!
    number: String
    title: String
    sections: [Section]
  }

  type Section {
    number: String
    title: String
  }
`;
