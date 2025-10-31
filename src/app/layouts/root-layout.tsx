import {  Outlet } from '@tanstack/react-router'
import { Header } from '../../shared/ui/header/header'
import styles from "./root-layout.module.css";
import { LoginButton } from '../../features/ui/login-button';


export const RootLayout = () => (
  <>
    <Header renderAccountBar={() => <LoginButton />} />
    
    <div className={styles.container}>
      <Outlet/>
    </div>
  </>
)

