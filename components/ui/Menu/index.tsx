import { useRouter } from "next/router";
import { destroyCookie } from 'nookies';
import React from "react";
import styles from './styles.module.scss';

const Menu = () => {
  const router = useRouter();
  const onLogout = () => {
    destroyCookie({}, 'token', {
      path: '/',
    });
    router.push('/');
  }

  return (
    <div className={styles.menu}>
      <div className={styles.navBar}>
        <p onClick={() => router.push('/')}>На главную</p>
        <p onClick={() => router.push('/user/profile')}>Смотреть слова</p>
      </div>
      <div>
      <p onClick={onLogout}>Выйти</p>
      </div>
    </div>
  )
}

export default Menu;