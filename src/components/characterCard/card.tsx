import './card.css';
import { CharacterCardProps } from './types';

export const Card = (props: CharacterCardProps): JSX.Element => {
  // eslint-disable-next-line no-console
  console.log(props);
  return (
    <article className="characterCard">
      <div className="characterCard__ImgWrapper">
        <img src={`${props.image}`} alt="Mechanical Rick" />
      </div>
      <div className="characterCard__content">
        <div className="section">
          <h2>{props.name}</h2>
          <span className="status">
            <span className={`status__icon status__icon-${props.status}`}></span>
            {props.status}
          </span>
        </div>
      </div>
    </article>
  );
};
