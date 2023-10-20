export default `#graphql
  enum EstimationUnit {
    HOURS_PER_DAY,
    HOURS_PER_WEEK,
    HOURS_PER_MONTH,
    DAYS_PER_MONTH,
    DAYS_PER_YEAR,
    FULL_TIME,
    PART_TIME,
    FLEXIBLE
  }
  enum ExperienceLevel {
    ENTRY_LEVEL,
    INTERMEDIATE,
    EXPERT,
  }
  type Estimation {
    unit: EstimationUnit
    value: Float
  }
  input EstimationInput {
    unit: EstimationUnit
    value: Float
  }
  type Attachment {
    name: String
    url: String 
  }
  input AttachmentInput {
    name: String
    url: String 
  }
  type Result {
    status: Boolean!
    message: String!
  }
`;
