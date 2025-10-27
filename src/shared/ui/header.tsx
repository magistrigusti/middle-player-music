import { Link } from '@tanstack/react-router';
import styles from './header.module.css';
import type { ReactNode } from 'react';

type Props = {
  renderAccountBar: () => ReactNode
}

export const Header = ({ renderAccountBar }: Props) => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.linksBlock}>
        <Link to="/">
          Main
        </Link>

        <Link to="/playlists-tith-filters">
          My Playlists
        </Link>

        <Link to="/oauth/callback">
          temp tanstack query
        </Link>
      </div>

      <div>{renderAccountBar}</div>
    </div>
  </header>
)