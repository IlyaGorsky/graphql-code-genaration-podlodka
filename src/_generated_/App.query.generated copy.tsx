import { loader } from 'graphql.macro';
import * as Types from '../../_generated_/types';
import { useQuery } from '../hooks/useQuery';

export type AppQueryVariables = Types.Exact<{
  page: Types.Scalars['Int'];
}>;

const AppQueryString = loader('./app.query.graphql');

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

export const useAppQuery = (variables: AppQueryVariables) =>
  useQuery<AppQuery, AppQueryVariables>(AppQueryString, variables);
