import { Card } from './characterCard/card';
import { CharacterCardProps } from './characterCard/types';

import './characters.css';

interface CharactersCardProps {
  characters: (CharacterCardProps | null)[];
}

export const Characters = (props: CharactersCardProps): JSX.Element | null => {
  // eslint-disable-next-line no-console
  console.log(props);
  if (!props.characters) {
    return null;
  }
  return (
    <div className="characters">
      {props.characters.map((character) => character && <Card key={character.id} {...character} />)}
    </div>
  );
};
