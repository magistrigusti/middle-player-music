import { Link } from "@tanstack/react-router";
import styles from '../account-bar.module.css';
import { useMe } from '../../api/use-me.ts';

export const CurrentUser = () => {
  const query = useMe();

  return (
    <div className={styles.meInfoContainer}>
      <Link to='/my-playlists' activeOptions={{ exact: true }}>
        {query.data!.login}
      </Link>
    </div>
  )
}