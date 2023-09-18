import { ResolversParentTypes } from "@generated/resolvers-types";
import { Context } from "@helpers/interfaces";

const sections = [
  {
    number: "1",
    title: "Getting started",
  },
  {
    number: "2",
    title: "Working with GraphQL",
  },
];

const chapters = [
  { id: "1", number: "1", title: "Getting started", sections },
  { id: "2", number: "2", title: "Second Chapter", sections },
  { id: "3", number: "3", title: "Getting started", sections },
];

export default {
  Query: {
    chapters: async (
      parent: ResolversParentTypes,
      args: any,
      context: Context
    ) => {
      return chapters;
    },
    chapter: async (
      parent: ResolversParentTypes,
      { id }: any,
      context: Context
    ) => {
      const chapter = chapters.filter((chapter) => chapter.number === id);
      return chapter[0];
    },
  },
};
