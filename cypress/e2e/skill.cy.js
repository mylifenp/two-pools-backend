/// <reference types="cypress" />
import { aliasMutation, aliasQuery } from "../utils/graphql-test-utils";

context("Skill tests", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:8080/graphql", (req) => {
      // Queries
      aliasQuery(req, "skills");
      aliasQuery(req, "skill");
      //Mutations
      aliasMutation(req, "AddSkill");
      aliasMutation(req, "UpdateSkill");
      aliasMutation(req, "DeleteSkill");
    });
  });

  it("should get all the skills", () => {
    cy.wait("@gqlSkillsQuery")
      .its("response.body.data.skills")
      .should("have.property", "id")
      .and("have.property", "name");
  });
});
