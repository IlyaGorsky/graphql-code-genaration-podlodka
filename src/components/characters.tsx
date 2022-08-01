import { Card, CardProps } from './card/card';

import './characters.css';

type CharactersType = CardProps;

export interface CharactersProps {
  characters: CharactersType[] | null;
}

export const Characters = (props: CharactersProps): JSX.Element | null => {
  // eslint-disable-next-line no-console
  console.log(props);
  if (!props.characters) {
    return null;
  }
  return (
    <div className="characters">
      {props.characters.map((character) => (
        <Card key={character.id} {...character} />
      ))}
    </div>
  );
};
