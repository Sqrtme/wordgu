import { useState } from 'react';
import cn from 'classnames';
import { IWord } from 'types';
import styles from './styles.module.scss'
const WordCardComponent = ({ de, ru, id }: IWord) => {  
  const [clicked, setClicked] = useState<boolean>(false);
  const renderWord = (records: string) => records.split(' ').map(record => <p key={record}>{record}</p>)
  return (
    <div
      id={id}
      onClick={() => setClicked(!clicked)}
      className={cn(styles.flip_card, clicked ? styles.flip_card__hover : undefined)}
    >
      <div className={cn(styles.flip_card__inner, clicked ? styles.flip_card__inner__hover : undefined)}>
        <div className={styles.flip_card__front}>{renderWord(de)}</div>
        <div className={styles.flip_card__back}>{renderWord(ru)}</div>
      </div>
    </div>
  );
}

export default WordCardComponent;