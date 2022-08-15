import * as Types from '../../../../_generated_/types';

export type CharacterCardFragment = { __typename?: 'Character' } & Pick<
  Types.Character,
  'id' | 'name' | 'status' | 'gender' | 'image'
>;
