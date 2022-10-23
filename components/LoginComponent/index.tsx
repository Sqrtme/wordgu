import { setCookie } from 'nookies'
import { parseCookies  } from 'nookies'
import { useState } from 'react'
import Link from 'next/link'
import Wrapper from 'components/ui/Wrapper';
import styles from './styles.module.scss'
import { useRouter } from 'next/router';

const LoginComponent = () => {
  const [login, setLogin] = useState<string>('');
  const [pas, setPas] = useState<string>('');
  const router = useRouter();

  const cookies = parseCookies();

  if (cookies.token) {
    router.push('/user/profile')
  }
  const onLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password: pas,
      })
    })
    const data = await res.json()

    if (data?.token) {
      setCookie(null, 'token', data?.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      router.push('/user/profile');
    }
  }

  return (
    <Wrapper>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
          placeholder={'Login'}
        />
        <input
          className={styles.input}
          type="password"
          onChange={(e) => setPas(e.target.value)}
          value={pas}
          placeholder={'Password'}
        />
        <div className={styles.button} onClick={onLogin}>Sign In</div>
        <div className={styles.registrationLink}>
          <span>New here? </span>
          <Link href="/registration">
            <a>Sign Up!</a>
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}

export default LoginComponent