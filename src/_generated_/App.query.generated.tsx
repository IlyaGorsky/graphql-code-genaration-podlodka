import * as Types from '../../_generated_/types';

export type AppQueryVariables = Types.Exact<{ [key: string]: never }>;

export type AppQuery = { __typename?: 'Query' } & {
  characters?: Types.Maybe<
    { __typename?: 'Characters' } & {
      results?: Types.Maybe<
        Array<
          Types.Maybe<
            { __typename?: 'Character' } & Pick<Types.Character, 'id' | 'name' | 'status' | 'gender' | 'image'>
          >
        >
      >;
    }
  >;
};
