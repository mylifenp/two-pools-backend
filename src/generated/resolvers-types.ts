import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Attachment = {
  __typename?: 'Attachment';
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type AttachmentInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Estimation = {
  __typename?: 'Estimation';
  unit?: Maybe<EstimationUnit>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type EstimationInput = {
  unit?: InputMaybe<EstimationUnit>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export enum EstimationUnit {
  DaysPerMonth = 'DAYS_PER_MONTH',
  DaysPerYear = 'DAYS_PER_YEAR',
  Flexible = 'FLEXIBLE',
  FullTime = 'FULL_TIME',
  HoursPerDay = 'HOURS_PER_DAY',
  HoursPerMonth = 'HOURS_PER_MONTH',
  HoursPerWeek = 'HOURS_PER_WEEK',
  PartTime = 'PART_TIME'
}

export enum ExperienceLevel {
  EntryLevel = 'ENTRY_LEVEL',
  Expert = 'EXPERT',
  Intermediate = 'INTERMEDIATE'
}

export type Health = {
  __typename?: 'Health';
  moreInfo?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']['output']>;
  addCategory: Category;
  addProject: Project;
  addSkill: Skill;
  deleteCategory: Category;
  deleteProject: Project;
  deleteSkill: Skill;
  health: Health;
  updateCategory: Category;
  updateProject: Project;
  updateSkill: Skill;
};


export type MutationAddCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationAddProjectArgs = {
  input?: InputMaybe<ProjectInput>;
};


export type MutationAddSkillArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSkillArgs = {
  id: Scalars['ID']['input'];
};


export type MutationHealthArgs = {
  status: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<ProjectInput>;
};


export type MutationUpdateSkillArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type Project = {
  __typename?: 'Project';
  attachments: Array<Maybe<Attachment>>;
  categories: Array<Maybe<Category>>;
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  estimation: Estimation;
  experience_level: ExperienceLevel;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  required_skills: Array<Skill>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  user: User;
};

export type ProjectInput = {
  attachments?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  estimation?: InputMaybe<EstimationInput>;
  experience_level?: InputMaybe<ExperienceLevel>;
  location?: InputMaybe<Scalars['String']['input']>;
  required_skills?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  DBHealth: Health;
  RedisHealth: Health;
  _?: Maybe<Scalars['Boolean']['output']>;
  categories: Array<Category>;
  category: Category;
  health: Health;
  project: Project;
  projects: Array<Project>;
  skill: Skill;
  skills: Array<Skill>;
  suggestCategories: Array<Maybe<Category>>;
  suggestSkills: Array<Maybe<Skill>>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySkillArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySuggestCategoriesArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};


export type QuerySuggestSkillsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type Skill = {
  __typename?: 'Skill';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']['output']>;
  categoryAdded: Category;
  categoryDeleted: Category;
  categoryUpdated: Category;
  health?: Maybe<Health>;
  projectAdded: Project;
  projectDeleted: Project;
  projectUpdated: Project;
  skillAdded: Skill;
  skillDeleted: Skill;
  skillUpdated: Skill;
};


export type SubscriptionProjectDeletedArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionProjectUpdatedArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionSkillUpdatedArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  oidc_id: Scalars['String']['output'];
  profile_url?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Attachment: ResolverTypeWrapper<Attachment>;
  AttachmentInput: AttachmentInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Estimation: ResolverTypeWrapper<Estimation>;
  EstimationInput: EstimationInput;
  EstimationUnit: EstimationUnit;
  ExperienceLevel: ExperienceLevel;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Health: ResolverTypeWrapper<Health>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Project: ResolverTypeWrapper<Project>;
  ProjectInput: ProjectInput;
  Query: ResolverTypeWrapper<{}>;
  Skill: ResolverTypeWrapper<Skill>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Attachment: Attachment;
  AttachmentInput: AttachmentInput;
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  Date: Scalars['Date']['output'];
  Estimation: Estimation;
  EstimationInput: EstimationInput;
  Float: Scalars['Float']['output'];
  Health: Health;
  ID: Scalars['ID']['output'];
  Mutation: {};
  Project: Project;
  ProjectInput: ProjectInput;
  Query: {};
  Skill: Skill;
  String: Scalars['String']['output'];
  Subscription: {};
  User: User;
}>;

export type AttachmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attachment'] = ResolversParentTypes['Attachment']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EstimationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Estimation'] = ResolversParentTypes['Estimation']> = ResolversObject<{
  unit?: Resolver<Maybe<ResolversTypes['EstimationUnit']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HealthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Health'] = ResolversParentTypes['Health']> = ResolversObject<{
  moreInfo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  addCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationAddCategoryArgs, 'name'>>;
  addProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, Partial<MutationAddProjectArgs>>;
  addSkill?: Resolver<ResolversTypes['Skill'], ParentType, ContextType, RequireFields<MutationAddSkillArgs, 'name'>>;
  deleteCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  deleteProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'id'>>;
  deleteSkill?: Resolver<ResolversTypes['Skill'], ParentType, ContextType, RequireFields<MutationDeleteSkillArgs, 'id'>>;
  health?: Resolver<ResolversTypes['Health'], ParentType, ContextType, RequireFields<MutationHealthArgs, 'status'>>;
  updateCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'id' | 'name'>>;
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'id'>>;
  updateSkill?: Resolver<ResolversTypes['Skill'], ParentType, ContextType, RequireFields<MutationUpdateSkillArgs, 'id' | 'name'>>;
}>;

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  attachments?: Resolver<Array<Maybe<ResolversTypes['Attachment']>>, ParentType, ContextType>;
  categories?: Resolver<Array<Maybe<ResolversTypes['Category']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  estimation?: Resolver<ResolversTypes['Estimation'], ParentType, ContextType>;
  experience_level?: Resolver<ResolversTypes['ExperienceLevel'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  required_skills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  DBHealth?: Resolver<ResolversTypes['Health'], ParentType, ContextType>;
  RedisHealth?: Resolver<ResolversTypes['Health'], ParentType, ContextType>;
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<QueryCategoryArgs, 'id'>>;
  health?: Resolver<ResolversTypes['Health'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<QueryProjectArgs, 'id'>>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  skill?: Resolver<ResolversTypes['Skill'], ParentType, ContextType, RequireFields<QuerySkillArgs, 'id'>>;
  skills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
  suggestCategories?: Resolver<Array<Maybe<ResolversTypes['Category']>>, ParentType, ContextType, Partial<QuerySuggestCategoriesArgs>>;
  suggestSkills?: Resolver<Array<Maybe<ResolversTypes['Skill']>>, ParentType, ContextType, Partial<QuerySuggestSkillsArgs>>;
}>;

export type SkillResolvers<ContextType = any, ParentType extends ResolversParentTypes['Skill'] = ResolversParentTypes['Skill']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  _?: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "_", ParentType, ContextType>;
  categoryAdded?: SubscriptionResolver<ResolversTypes['Category'], "categoryAdded", ParentType, ContextType>;
  categoryDeleted?: SubscriptionResolver<ResolversTypes['Category'], "categoryDeleted", ParentType, ContextType>;
  categoryUpdated?: SubscriptionResolver<ResolversTypes['Category'], "categoryUpdated", ParentType, ContextType>;
  health?: SubscriptionResolver<Maybe<ResolversTypes['Health']>, "health", ParentType, ContextType>;
  projectAdded?: SubscriptionResolver<ResolversTypes['Project'], "projectAdded", ParentType, ContextType>;
  projectDeleted?: SubscriptionResolver<ResolversTypes['Project'], "projectDeleted", ParentType, ContextType, RequireFields<SubscriptionProjectDeletedArgs, 'id'>>;
  projectUpdated?: SubscriptionResolver<ResolversTypes['Project'], "projectUpdated", ParentType, ContextType, RequireFields<SubscriptionProjectUpdatedArgs, 'id'>>;
  skillAdded?: SubscriptionResolver<ResolversTypes['Skill'], "skillAdded", ParentType, ContextType>;
  skillDeleted?: SubscriptionResolver<ResolversTypes['Skill'], "skillDeleted", ParentType, ContextType>;
  skillUpdated?: SubscriptionResolver<ResolversTypes['Skill'], "skillUpdated", ParentType, ContextType, RequireFields<SubscriptionSkillUpdatedArgs, 'id'>>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  oidc_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Attachment?: AttachmentResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Estimation?: EstimationResolvers<ContextType>;
  Health?: HealthResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

