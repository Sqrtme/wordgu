import React, { ReactNode } from 'react';
import styles from 'styles/Home.module.scss';
import Menu from 'components/ui/Menu';
interface IWrapperProps { 
  children: ReactNode;
  showMenu?: boolean;
}
const Wrapper = ({ children, showMenu }: IWrapperProps) => {
  return (
    <div>
      {showMenu && <Menu />}
      <div style={{ height: '90vh' }}>
        {children}
      </div>
    </div>
  )
}

export default Wrapper;