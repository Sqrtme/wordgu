import React, { useState } from "react";
import 'src/styles.scss';

interface IWordFlashCardComponentProps {
  de: string;
  ru: string;
}
const WordFlashCardComponent = ({ de, ru }: IWordFlashCardComponentProps) => {
  const [isActive, setActive] = useState<boolean>(false);
  const onToggle = () => setActive(!isActive);
  return (
    <div  onClick={onToggle} className={`f-card ${isActive ? 'f-card-hover' : ''}`}>
      <div className="f-card-inner">
        <div className="f-card-front">
          <p>{de}</p>
        </div>
        <div className="f-card-back">
          <p>{ru}</p>
        </div>
      </div>
    </div>
  )
}

export default WordFlashCardComponent;
