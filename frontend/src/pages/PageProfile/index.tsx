import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getWords } from "../../api";
import { IWord } from '../../types';
import { getToken } from '../../api/storage';
import '../../styles.scss';
import WordFlashCardComponent from "../../components/WordFlashCardComponent";

const PageProfile = () => {
  const [words, setWords] = useState<IWord[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    } else {
      getWords().then((res) => {
        setWords(res);
      }).catch(err => new Error(err));
    }
  }, []);

  if (!words.length) {
    return <div>...</div>
  }
  return (
    <div className="layout words-list">
      {words.map(({ ru, de, id }) => <WordFlashCardComponent key={id} ru={ru} de={de} />)}
    </div>
  )
}

export default PageProfile;