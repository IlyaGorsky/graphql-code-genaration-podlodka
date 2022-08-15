import * as Types from '../../_generated_/types';

import { useQuery } from '../hooks/useQuery';
import { gql } from 'graphql.macro';
import { CharacterCardFragmentDoc } from '../components/characterCard/_generated_/characterCard.fragment.generated';
export type AppQueryVariables = Types.Exact<{
  page: Types.Scalars['Int'];
}>;

export type AppQuery = {
  __typename?: 'Query';
  characters?: {
    __typename?: 'Characters';
    results?: Array<{
      __typename?: 'Character';
      id?: string | null;
      name?: string | null;
      status?: string | null;
      gender?: string | null;
      image?: string | null;
    } | null> | null;
  } | null;
};

export const AppDocument = gql`
  query App($page: Int!) {
    characters(page: $page) {
      results {
        ...CharacterCard
      }
    }
  }
  ${CharacterCardFragmentDoc}
`;

export const useAppQuery = (variables: AppQueryVariables) =>
  useQuery<AppQuery, AppQueryVariables>(AppDocument, variables);
