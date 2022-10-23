import WordCardComponent from 'components/ui/WordCardComponent';
import { useRouter } from 'next/router'
import { parseCookies  } from 'nookies'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss';
import { IWord } from 'types';
import Wrapper from 'components/ui/Wrapper';

const Profile = () => {
  const router = useRouter()
  const cookies = parseCookies()
  const [words, setWords] = useState<IWord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserWords = async () => {
    const res = await fetch('/api/getUserWords', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: cookies.token }),
    });

    const data = await res.json();
    if (data.words.length !== words.length) {
      setWords(data.words);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!cookies.token) {
      router.push('/');
    } else {
      getUserWords();
    }
  }, [])


  return (
    <Wrapper showMenu={true}>
      <div className={styles.container}>
        {words.length ? words.map(word => <WordCardComponent key={word.id} {...word} />) : null}
      </div>
    </Wrapper>
  )
}

export default Profile;
