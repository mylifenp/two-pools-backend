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

export type AddCemeteryInput = {
  address?: InputMaybe<AddressInput>;
  coordinates?: InputMaybe<CoordinatesInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  trustee: Scalars['ID']['input'];
};

export type AddTrusteeInput = {
  address?: InputMaybe<AddressInput>;
  bankDetails?: InputMaybe<Array<InputMaybe<BankDetailInput>>>;
  contacts?: InputMaybe<ContactsInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  houseNumber?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  houseNumber?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type BankDetail = {
  __typename?: 'BankDetail';
  bankName?: Maybe<Scalars['String']['output']>;
  bic?: Maybe<Scalars['String']['output']>;
  iban?: Maybe<Scalars['String']['output']>;
};

export type BankDetailInput = {
  bankName?: InputMaybe<Scalars['String']['input']>;
  bic?: InputMaybe<Scalars['String']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
};

export type Cemetery = {
  __typename?: 'Cemetery';
  address?: Maybe<Address>;
  coordinates?: Maybe<Coordinates>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  trustee?: Maybe<Trustee>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Contacts = {
  __typename?: 'Contacts';
  emails?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  phones?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type ContactsInput = {
  emails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

export type CoordinatesInput = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']['output']>;
  addCemetery?: Maybe<Cemetery>;
  addTrustee?: Maybe<Trustee>;
  updateTrustee?: Maybe<Trustee>;
};


export type MutationAddCemeteryArgs = {
  input: AddCemeteryInput;
};


export type MutationAddTrusteeArgs = {
  input: AddTrusteeInput;
};


export type MutationUpdateTrusteeArgs = {
  id: Scalars['ID']['input'];
  input: AddTrusteeInput;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']['output']>;
  cemetery?: Maybe<Cemetery>;
  test?: Maybe<Test>;
  trustee?: Maybe<Trustee>;
};


export type QueryCemeteryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTrusteeArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']['output']>;
  trusteeUpdated: TrusteeUpdated;
};

export type Test = {
  __typename?: 'Test';
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Trustee = {
  __typename?: 'Trustee';
  address?: Maybe<Address>;
  bankDetails?: Maybe<Array<Maybe<BankDetail>>>;
  cemeteries?: Maybe<Array<Maybe<Cemetery>>>;
  contacts?: Maybe<Contacts>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type TrusteeUpdated = {
  __typename?: 'TrusteeUpdated';
  event: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  trustee: Trustee;
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
  AddCemeteryInput: AddCemeteryInput;
  AddTrusteeInput: AddTrusteeInput;
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  BankDetail: ResolverTypeWrapper<BankDetail>;
  BankDetailInput: BankDetailInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Cemetery: ResolverTypeWrapper<Cemetery>;
  Contacts: ResolverTypeWrapper<Contacts>;
  ContactsInput: ContactsInput;
  Coordinates: ResolverTypeWrapper<Coordinates>;
  CoordinatesInput: CoordinatesInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Test: ResolverTypeWrapper<Test>;
  Trustee: ResolverTypeWrapper<Trustee>;
  TrusteeUpdated: ResolverTypeWrapper<TrusteeUpdated>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddCemeteryInput: AddCemeteryInput;
  AddTrusteeInput: AddTrusteeInput;
  Address: Address;
  AddressInput: AddressInput;
  BankDetail: BankDetail;
  BankDetailInput: BankDetailInput;
  Boolean: Scalars['Boolean']['output'];
  Cemetery: Cemetery;
  Contacts: Contacts;
  ContactsInput: ContactsInput;
  Coordinates: Coordinates;
  CoordinatesInput: CoordinatesInput;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  Test: Test;
  Trustee: Trustee;
  TrusteeUpdated: TrusteeUpdated;
}>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  houseNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BankDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['BankDetail'] = ResolversParentTypes['BankDetail']> = ResolversObject<{
  bankName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  iban?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CemeteryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cemetery'] = ResolversParentTypes['Cemetery']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  coordinates?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trustee?: Resolver<Maybe<ResolversTypes['Trustee']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contacts'] = ResolversParentTypes['Contacts']> = ResolversObject<{
  emails?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  phones?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']> = ResolversObject<{
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  addCemetery?: Resolver<Maybe<ResolversTypes['Cemetery']>, ParentType, ContextType, RequireFields<MutationAddCemeteryArgs, 'input'>>;
  addTrustee?: Resolver<Maybe<ResolversTypes['Trustee']>, ParentType, ContextType, RequireFields<MutationAddTrusteeArgs, 'input'>>;
  updateTrustee?: Resolver<Maybe<ResolversTypes['Trustee']>, ParentType, ContextType, RequireFields<MutationUpdateTrusteeArgs, 'id' | 'input'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  cemetery?: Resolver<Maybe<ResolversTypes['Cemetery']>, ParentType, ContextType, RequireFields<QueryCemeteryArgs, 'id'>>;
  test?: Resolver<Maybe<ResolversTypes['Test']>, ParentType, ContextType>;
  trustee?: Resolver<Maybe<ResolversTypes['Trustee']>, ParentType, ContextType, RequireFields<QueryTrusteeArgs, 'id'>>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  _?: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "_", ParentType, ContextType>;
  trusteeUpdated?: SubscriptionResolver<ResolversTypes['TrusteeUpdated'], "trusteeUpdated", ParentType, ContextType>;
}>;

export type TestResolvers<ContextType = any, ParentType extends ResolversParentTypes['Test'] = ResolversParentTypes['Test']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrusteeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Trustee'] = ResolversParentTypes['Trustee']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  bankDetails?: Resolver<Maybe<Array<Maybe<ResolversTypes['BankDetail']>>>, ParentType, ContextType>;
  cemeteries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Cemetery']>>>, ParentType, ContextType>;
  contacts?: Resolver<Maybe<ResolversTypes['Contacts']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrusteeUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrusteeUpdated'] = ResolversParentTypes['TrusteeUpdated']> = ResolversObject<{
  event?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  trustee?: Resolver<ResolversTypes['Trustee'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Address?: AddressResolvers<ContextType>;
  BankDetail?: BankDetailResolvers<ContextType>;
  Cemetery?: CemeteryResolvers<ContextType>;
  Contacts?: ContactsResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Test?: TestResolvers<ContextType>;
  Trustee?: TrusteeResolvers<ContextType>;
  TrusteeUpdated?: TrusteeUpdatedResolvers<ContextType>;
}>;

