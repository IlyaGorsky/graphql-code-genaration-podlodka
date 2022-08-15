import * as Types from '../../../../_generated_/types';

import { gql } from 'graphql.macro';
export type CharacterCardFragment = {
  __typename?: 'Character';
  id?: string | null;
  name?: string | null;
  status?: string | null;
  gender?: string | null;
  image?: string | null;
};

export const CharacterCardFragmentDoc = gql`
  fragment CharacterCard on Character {
    id
    name
    status
    gender
    image
  }
`;
