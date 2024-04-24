'use client';

import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from 'react-icons/md';
import { menuItems } from '../sidebar/menuItems';

const Navbar = () => {
  const pathname = usePathname();
  const getMenuTitleForPath = () => {
    for (const menuItem of menuItems) {
      for (const item of menuItem.list) {
        if (item.path === pathname) {
          return item.title;
        }
      }
    }
    return 'Menu';
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{getMenuTitleForPath()}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch />
          <input
            type='text'
            placeholder='Búsqueda...'
            className={styles.input}
          />
        </div>
        <div className={styles.icons}>
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
